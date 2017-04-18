// import * as utils from './utils';

export default class Tile {
  static rowLength = 7;
  static width;
  static height;
  static padding = 6;
  health: number;
  pos: Pos;

  constructor() {
    this.health = this.getRandomInt(1, 5);
  }

  update(delta: number) {
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(this.pos.x + Tile.padding, this.pos.y + Tile.padding,
      Tile.width - Tile.padding, Tile.height - Tile.padding);
    ctx.fillStyle = '#43A047';
    ctx.fill();
    this.drawHealth(ctx);
    ctx.closePath();
    ctx.restore();
  }

  drawHealth(ctx: CanvasRenderingContext2D) {
    ctx.font = 'bold 16pt sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText(this.health.toString(), this.pos.x + (Tile.width / 1.9), this.pos.y + (Tile.height / 1.58));
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
