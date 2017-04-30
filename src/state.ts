import Player from './player';
import PlayerBall from './player-ball';
import Tile from './tile';
import MobTile from './mob-tile';
import PowerTile from './power-tile';
import PowerBall from './power-ball';
import Mouse from './mouse';
import RenderCache from './render-cache';
import * as game from './game';
import * as utils from './utils';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

let gameState = State.IDLE;

const player = new Player(canvas);

const tileCache = new RenderCache(canvas.width, canvas.height);
const playerCache = new RenderCache(canvas.width, canvas.height);

const tiles: Tile[] = [];
let powerBalls: PowerBall[] = [];

addTileLine();

const balls: PlayerBall[] = [];
const ballSpawn: BallSpawn = {
  rate: 20,
  countdown: 1,
  next: 0
};

balls.push(new PlayerBall(canvas));

let nextRoundBalls = 0;

const mouse = new Mouse(canvas);

mouse.onClick = () => {
  if (gameState === State.IDLE) {
    gameState = State.PLAY_START;
  }
};
mouse.onRelease = () => {
  if (gameState === State.PLAY_START) {
    gameState = State.BALL_SPAWN;
  }
};

function spawnBalls() {
  ballSpawn.countdown--;
  if (ballSpawn.countdown === 0) {
    ballSpawn.countdown = ballSpawn.rate;

    balls[ballSpawn.next].reset(player);

    ballSpawn.next++;

    if (ballSpawn.next >= balls.length) {
      ballSpawn.next = 0;
      ballSpawn.countdown = 1;
      gameState = State.PLAYING;
    }
  }
}

let firstDeadBall = null;
let ballHomeX: number;

function updateBalls(delta: number) {
  let aliveCount = 0;

  for (let i = 0; i < balls.length; ++i) {
    const ball = balls[i];
    const playerX = firstDeadBall ? ballHomeX + player.width : null;

    if (ball.alive) {
      ball.update(delta, playerX);

      if (ball.alive) {
        aliveCount++;
      }
    }

    if (!firstDeadBall && ball.return) {
      firstDeadBall = ball;
      ballHomeX = firstDeadBall.pos.x - player.width;
    }
  }

  if (aliveCount === 0) {
    for (let i = 0; i < balls.length; ++i) {
      balls[i].return = false;
    }

    player.pos.x = ballHomeX;
    ballHomeX = ballHomeX + player.width;
    firstDeadBall = null;
    gameState = State.PWR_RETURN;
  }
}

function updatePowerBalls(delta: number) {
  for (let i = 0; i < powerBalls.length; ++i) {
    powerBalls[i].update(delta);
  }
}

function returnPowerBalls(delta: number, homePosX: number) {
  if (powerBalls.length) {
    let aliveCount = 0;

    for (let i = 0; i < powerBalls.length; ++i) {
      powerBalls[i].update(delta, homePosX);

      if (powerBalls[i].alive) {
        aliveCount++;
      }
    }

    if (aliveCount === 0) {
      for (let i = 0; i < nextRoundBalls; ++i) {
        balls.push(new PlayerBall(canvas));
      }

      powerBalls = [];
      nextRoundBalls = 0;
      gameState = State.NEW_LINE;
    }
  } else {
    gameState = State.NEW_LINE;
  }
}

function addTileLine() {
  const pwrTilePos = utils.getRandomInt(0, Tile.rowLength - 1);
  // const pwrTilePos = -1;

  for (let i = 0; i < Tile.rowLength; ++i) {
    if (i === pwrTilePos) {
      tiles.push(new PowerTile());
    } else {
      tiles.push(new MobTile());
    }
  }

  game.setTilePositions(canvas, tiles);
  Tile.rerender = true;
  gameState = State.IDLE;
}

function tileHit(tile: Tile, ball: PlayerBall, direction?: string) {
  tile.hit();

  if (direction) {
    switch(direction) {
      case 'top':
      case 'bottom':
        ball.ver.y = -ball.ver.y;
        ball.pos.y = ball.lastPos.y;
        break;
      case 'left':
      case 'right':
        ball.ver.x = -ball.ver.x;
        ball.pos.x = ball.lastPos.x;
        break;
    }
  } else {
    nextRoundBalls++;
    const pos: Vector = {
      x: tile.pos.x,
      y: tile.pos.y
    }
    powerBalls.push(new PowerBall(canvas, pos));
  }
}

function renderTiles(ctx: CanvasRenderingContext2D) {
  for (let i = 0; i < tiles.length; ++i) {
    tiles[i].draw(ctx);
  }
}

export function update(delta: number) {
  switch (gameState) {
    case State.PLAY_START:
      player.update(delta, mouse);
      break;
    case State.BALL_SPAWN:
      spawnBalls();
      updateBalls(delta);
      game.collisionDetection(tiles, balls, tileHit);
      updatePowerBalls(delta);
      break;
    case State.PLAYING:
      updateBalls(delta);
      game.collisionDetection(tiles, balls, tileHit);
      updatePowerBalls(delta);
      break;
    case State.PWR_RETURN:
      returnPowerBalls(delta, ballHomeX);
      break;
    case State.NEW_LINE:
      addTileLine();
      break;
  }
}

export function draw(fps) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (gameState) {
    case State.PLAY_START:
      player.rerender = playerCache.draw(
        ctx, player.rerender, player.draw.bind(player));
      break;
  }

  for (let i = 0; i < powerBalls.length; ++i) {
    powerBalls[i].draw(ctx);
  }

  for (let i = 0; i < balls.length; ++i) {
    balls[i].draw(ctx);
  }

  Tile.rerender = tileCache.draw(ctx, Tile.rerender, renderTiles);

  utils.writeMessage(ctx, Math.round(fps));
  // utils.writeMessage(ctx, mouse.pos.x + ', ' + mouse.pos.y);
}
