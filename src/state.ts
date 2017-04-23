import Player from './player';
import Ball from './ball';
import Tile from './tile';
import Mouse from './mouse';
import * as game from './game';
import * as utils from './utils';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

let gameState = State.IDLE;

const player = new Player(canvas);

const tiles: Tile[] = [];
for (let i = 0; i < 14; ++i) {
  tiles.push(new Tile());
}

const balls: Ball[] = [];
const ballSpawn: BallSpawn = {
  start: false,
  rate: 25,
  countdown: 1,
  next: 0
};

for (let i = 0; i < 2; ++i) {
  balls.push(new Ball(canvas));
}

game.setTilePositions(canvas, tiles);

const mouse = new Mouse(canvas);

mouse.onClick = () => gameState = State.PLAY_START;
mouse.onRelease = () => gameState = State.BALL_SPAWN;

function spawnBalls() {
  ballSpawn.countdown--;
  if (ballSpawn.countdown === 0) {
    ballSpawn.countdown = ballSpawn.rate;

    balls[ballSpawn.next].reset(player);

    ballSpawn.next++;

    if (ballSpawn.next >= balls.length) {
      gameState = State.PLAYING;
    }
  }
}

function updateBalls(delta: number) {
  for (let i = 0; i < balls.length; ++i) {
    if (balls[i].alive) {
      balls[i].update(delta);
    }
  }
}

export function update(delta: number) {
  switch (gameState) {
    case State.PLAY_START:
      player.update(delta, mouse);
      break;
    case State.BALL_SPAWN:
      spawnBalls();
      // Then..
    case State.BALL_SPAWN:
    case State.PLAYING:
      updateBalls(delta);
      game.collisionDetection(canvas, tiles, balls);
      break;
  }
}

export function draw(fps) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (gameState) {
    case State.PLAY_START:
      player.draw(ctx);
      break;
  }

  for (let i = 0; i < balls.length; ++i) {
    balls[i].draw(ctx);
  }

  for (let i = 0; i < tiles.length; ++i) {
    tiles[i].draw(ctx);
  }

  utils.writeMessage(ctx, Math.round(fps));
}