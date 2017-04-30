import Tile from './tile';
import { getRandomInt } from './utils';

export default class MobTile extends Tile {
  readonly isMob = true;
  canHit: boolean = true;

  constructor() {
    super();
    this.health = getRandomInt(1, 5);
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
    const pos: Vector = {
      x: Math.floor(this.pos.x + (this.width / 2)),
      y: Math.floor(this.pos.y + (this.height / 1.61))
    };

    ctx.font = 'bold 16pt sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#1c2429';
    ctx.fillText(this.health.toString(), pos.x, pos.y);
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
