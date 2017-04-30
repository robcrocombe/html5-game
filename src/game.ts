import Tile from './tile';
import MobTile from './mob-tile';
import PowerTile from './power-tile';
import Ball from './ball';

interface IHitFunc {
  (tile: Tile, ball: Ball, direction?: string)
}

const xPadding = 150;
const yPadding = 100;
let tileHeights: number[];
let tileRows: Tile[][];

export function setTilePositions(canvas: HTMLCanvasElement, tiles: Tile[]) {
  let pos: Vector = { x: xPadding, y: yPadding };
  tileHeights = [];
  tileRows = [];
  tileRows.push([]);
  let rowIndex = 0;

  const width = Math.floor((canvas.width - (xPadding * 2)) / Tile.rowLength);
  const height = width;

  for (let i = tiles.length - 1; i >= 0; --i) {

    tiles[i].setPosition(pos.x, pos.y, width, height);

    pos.x += width;

    tileRows[rowIndex].push(tiles[i]);

    if (i % Tile.rowLength === 0) {
      pos.x = xPadding;
      pos.y += height;

      tileHeights.push(pos.y);
      tileRows.push([]);
      rowIndex++;
    }
  }
}

export function collisionDetection(tiles: Tile[], balls: Ball[], hit: IHitFunc) {
  for (let i = 0; i < balls.length; ++i) {
    const ball = balls[i];
    // checkTileCollision(tiles, balls, ball);
    checkBallWithinTileRow(tiles, balls, ball, hit);
  }
}

function checkBallWithinTileRow(tiles: Tile[], balls: Ball[], ball: Ball, hit: IHitFunc) {
  for (let i = 0; i < tileHeights.length; ++i) {
    if (ball.pos.y <= tileHeights[i]) {
      const row = tileRows[i];

      checkTileCollision(row, balls, ball, hit);
    }
  }
}

function checkTileCollision(tiles: Tile[], balls: Ball[], ball: Ball, hit: IHitFunc) {
  for (let j = 0; j < tiles.length; ++j) {

    const tile = tiles[j];

    if (tile.health < 1 || ball.ver.x === 0) {
      continue;
    }

    if (tile.isMob) {
      collides4(tile as MobTile, ball, hit);
    } else {
      circularCollision(tile as PowerTile, ball, hit);
    }
  }
}

function collides4(tile: MobTile, ball: Ball, hit: IHitFunc) {
  const dir = collides5(tile, ball);

  if (dir) {
    hit(tile, ball, dir);
  }
}

function collides5(tile: Tile, ball: Ball): string {
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

function circularCollision(tile: PowerTile, ball: Ball, hit: IHitFunc) {
  const dx = tile.pos.x - ball.pos.x;
  const dy = tile.pos.y - ball.pos.y;
  const radii = ball.radius + tile.radius;

  if ((dx * dx) + (dy * dy) < radii * radii) {
    hit(tile, ball);
  }
}
