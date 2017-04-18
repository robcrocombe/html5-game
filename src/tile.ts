// import * as utils from './utils';

export default class Tile {
  static width;
  static height;
  static padding = 6;
  pos: Pos;

  constructor() {}

  update(delta: number) {
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(this.pos.x + Tile.padding, this.pos.y + Tile.padding,
      Tile.width - Tile.padding, Tile.height - Tile.padding);
    ctx.fillStyle = '#43A047';
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
