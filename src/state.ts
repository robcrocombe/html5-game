import Player from './player';
import Ball from './ball';
import Tile from './tile';
import MobTile from './mob-tile';
import BallTile from './ball-tile';
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

addTileLine();

const balls: Ball[] = [];
const ballSpawn: BallSpawn = {
  rate: 20,
  countdown: 1,
  next: 0
};

balls.push(new Ball(canvas));

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

    balls.push(new Ball(canvas));
    player.pos.x = ballHomeX;
    firstDeadBall = null;
    gameState = State.NEW_LINE;
  }
}

function addTileLine() {
  // const ballTilePos = utils.getRandomInt(0, Tile.rowLength - 1);
  const ballTilePos = -1;

  for (let i = 0; i < Tile.rowLength; ++i) {
    if (i === ballTilePos) {
      tiles.push(new BallTile());
    } else {
      tiles.push(new MobTile());
    }
  }

  game.setTilePositions(canvas, tiles);
  Tile.rerender = true;
  gameState = State.IDLE;
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
      game.collisionDetection(tiles, balls);
      break;
    case State.PLAYING:
      updateBalls(delta);
      game.collisionDetection(tiles, balls);
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

  for (let i = 0; i < balls.length; ++i) {
    balls[i].draw(ctx);
  }

  Tile.rerender = tileCache.draw(ctx, Tile.rerender, renderTiles);

  utils.writeMessage(ctx, Math.round(fps));
  // utils.writeMessage(ctx, mouse.pos.x + ', ' + mouse.pos.y);
}
