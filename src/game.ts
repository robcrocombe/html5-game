import Tile from './tile';
import MobTile from './mob-tile';
import PowerTile from './power-tile';
import PlayerBall from './player-ball';
import RenderCache from './render-cache';

interface IHitFunc {
  (tile: Tile, ball: PlayerBall, direction?: string)
}

const xPadding = 150;
let yPadding;
let tileHeights: number[];
let tileRows: Tile[][];
let nextHeight = 0;

export function setTilePositions(canvas: HTMLCanvasElement, tiles: Tile[]) {
  const width = Math.floor((canvas.width - (xPadding * 2)) / Tile.rowLength);
  const height = width;
  yPadding = height;

  let pos: Vector = { x: xPadding, y: 0 };
  tileHeights = [];
  tileRows = [];
  tileRows.push([]);
  let rowIndex = 0;

  for (let i = tiles.length - 1; i >= 0; --i) {

    tiles[i].setPosition(pos.x, pos.y, width, height);

    pos.x += width;

    tileRows[rowIndex].push(tiles[i]);

    if (i % Tile.rowLength === 0) {
      pos.x = xPadding;
      pos.y += height;

      tileRows.push([]);
      rowIndex++;
    }
  }

  nextHeight += yPadding;
  console.log(nextHeight);
}

export function animateRow(tileCache: RenderCache, delta: number) {
  // for (let i = 0; i < tiles.length; ++i) {
  //   tiles[i].pos.y += nextSpeed * delta;
  // }

  // Tile.rerender = true;

  // if (tiles[tiles.length - 1].pos.y >= nextHeight) {
  //   return true;
  // }
  // return false;

  tileCache.offsetY += 0.1 * delta;
  Tile.rerender = true;

  if (tileCache.offsetY >= nextHeight) {
    // tileCache.offsetY = nextHeight;
    return true;
  }
  return false;
}

export function collisionDetection(tiles: Tile[], balls: PlayerBall[], hit: IHitFunc) {
  for (let i = 0; i < balls.length; ++i) {
    const ball = balls[i];
    // checkTileCollision(tiles, balls, ball);
    checkBallWithinTileRow(tiles, balls, ball, hit);
  }
}

function checkBallWithinTileRow(tiles: Tile[], balls: PlayerBall[], ball: PlayerBall, hit: IHitFunc) {
  for (let i = 0; i < tileHeights.length; ++i) {
    if (ball.pos.y <= tileHeights[i]) {
      const row = tileRows[i];

      checkTileCollision(row, balls, ball, hit);
    }
  }
}

function checkTileCollision(tiles: Tile[], balls: PlayerBall[], ball: PlayerBall, hit: IHitFunc) {
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

function collides4(tile: MobTile, ball: PlayerBall, hit: IHitFunc) {
  const dir = collides5(tile, ball);

  if (dir) {
    hit(tile, ball, dir);
  }
}

function collides5(tile: Tile, ball: PlayerBall): string {
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

function circularCollision(tile: PowerTile, ball: PlayerBall, hit: IHitFunc) {
  const dx = tile.pos.x - ball.pos.x;
  const dy = tile.pos.y - ball.pos.y;
  const radii = ball.radius + tile.radius;

  if ((dx * dx) + (dy * dy) < radii * radii) {
    hit(tile, ball);
  }
}
