import Tile from './tile';
import Ball from './ball';

const xPadding = 150;
const yPadding = 100;

export function setTilePositions(canvas: HTMLCanvasElement, tiles: Tile[]) {
  let pos: Vector = { x: xPadding, y: yPadding };

  const width = Math.floor((canvas.width - (xPadding * 2)) / Tile.rowLength);
  const height = width;

  for (let i = tiles.length - 1; i >= 0; --i) {

    tiles[i].setPosition(pos.x, pos.y, width, height);

    pos.x += width;

    if (i % Tile.rowLength === 0) {
      pos.x = xPadding;
      pos.y += height;
    }
  }
}

export function collisionDetection(canvas: HTMLCanvasElement, tiles: Tile[], balls: Ball[]) {
  for (let i = 0; i < balls.length; ++i) {
    for (let j = 0; j < tiles.length; ++j) {
      const ball = balls[i];
      const tile = tiles[j];

      if (tile.health < 1 || ball.ver.x === 0) {
        continue;
      }

      if (collides4(tile, ball)) {
        collisionDetection(canvas, tiles, balls);
      }
    }
  }
}

function collides4(tile: Tile, ball: Ball) {
  const c = collides5(tile, ball);

  if (c) {
    // tile.hit();

    switch(c) {
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
  }
}

function collides5(tile: Tile, ball: Ball) {
  const dx = (tile.pos.x + tile.width/2) - (ball.pos.x + ball.radius / 2);
  const dy = (tile.pos.y + tile.height/2) - (ball.pos.y + ball.radius / 2);
  const width = (tile.width + ball.radius) / 2;
  const height = (tile.height + ball.radius) / 2;
  const crossWidth = width * dy;
  const crossHeight = height * dx;
  let collision = null;

  if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
    if (crossWidth > crossHeight) {
      collision = (crossWidth > -crossHeight) ? 'bottom' : 'left';
    } else {
      collision = (crossWidth > -crossHeight) ? 'right' : 'top';
    }
  }
  return collision;
}
