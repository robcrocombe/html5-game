import Tile from './tile';

export default class PowerTile extends Tile {
  readonly isMob = false;
  radius = 18;

  constructor() {
    super();
    this.health = 1;
  }

  setPosition(x: number, y: number, width: number, height: number) {
    this.pos = {
      x: x + (width / 2),
      y: y + (height / 2)
    };

    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.health > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.radius - 7, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
  }

  hit() {
    this.health = 0;
    Tile.rerender = true;
  }
}
