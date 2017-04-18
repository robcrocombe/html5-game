import Tile from './tile';

const xPadding = 150;
const yPadding = 20;

export function setTilePositions(canvas: HTMLCanvasElement, tiles: Tile[]) {
  let pos: Pos = { x: xPadding, y: yPadding };

  Tile.width = Math.floor((canvas.width - (xPadding * 2)) / Tile.rowLength);
  Tile.height = Tile.width;

  for (let i = tiles.length - 1; i >= 0; --i) {

    tiles[i].pos = {
      x: pos.x,
      y: pos.y
    };

    pos.x += Tile.width;

    if (i % Tile.rowLength === 0) {
      pos.x = xPadding;
      pos.y += Tile.height;
    }
  }
}
