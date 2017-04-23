import Player from './player';
import Ball from './ball';
import Tile from './tile';
import Mouse from './mouse';
import * as game from './game';
import * as utils from './utils';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const player = new Player(canvas);

const tiles: Tile[] = [];
const balls: Ball[] = [];
let ballCount: number = 2;

for (let i = 0; i < 14; ++i) {
  tiles.push(new Tile());
}

game.setTilePositions(canvas, tiles);

const mouse = new Mouse(canvas);

export function update(delta: number) {
  player.update(delta, mouse);
  if (balls.length) {
    for (let i = 0; i < ballCount; ++i) {
      if (balls[i].alive) {
        balls[i].update(delta);
      }
    }
    game.collisionDetection(canvas, tiles, balls);
  }
}

export function draw(fps) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);

  if (balls.length) {
    for (let i = 0; i < ballCount; ++i) {
      balls[i].draw(ctx);
    }
  }

  for (let i = 0; i < tiles.length; ++i) {
    tiles[i].draw(ctx);
  }

  utils.writeMessage(ctx, Math.round(fps));
}
