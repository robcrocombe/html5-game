import Tile from './tile';

export default class MobTile extends Tile {
  health: number;
  canHit: boolean = true;

  constructor() {
    super();
    this.health = this.getRandomInt(1, 5);
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.health > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
      ctx.fillStyle = '#43A047';
      ctx.fill();
      this.drawHealth(ctx);
      ctx.closePath();
      ctx.restore();
    }
  }

  drawHealth(ctx: CanvasRenderingContext2D) {
    ctx.font = 'bold 16pt sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText(this.health.toString(), this.pos.x + (this.width / 2), this.pos.y + (this.height / 1.61));
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.round(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  hit() {
    if (this.health > 0) {
      if (this.canHit) {
        this.health--;
        this.canHit = false;
        Tile.rerender = true;

        setTimeout(() => this.canHit = true, 100);
      }
    }
  }
}
