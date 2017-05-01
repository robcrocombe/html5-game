import * as utils from './utils';
import Ball from './ball';

export default class PowerBall extends Ball {
  return: boolean = false;
  originPos: Vector;
  bounce = false;

  constructor(canvas: HTMLCanvasElement, pos: Vector) {
    super(canvas);

    this.alive = true;
    this.pos = pos;
    this.originPos = Object.assign({}, pos);
    this.ver = { x: 0, y: -0.02 };
  }

  update(delta: number, playerX?: number) {
    if (this.pos.y + this.ver.y >= this.canvas.height - this.radius) {
      this.ver.y = 0;
      this.ver.x = this.speed;
      this.pos.y = this.canvas.height - this.radius;

      if (playerX) {
        this.returnToPlayer(delta, playerX);
        return;
      }
    }

    if (this.pos <= this.originPos && this.ver.y < 0 && this.ver.y > -0.23 && !this.bounce) {
      this.ver.y -= 0.2;
    } else {
      this.ver.y += 0.015;
      if (!this.bounce) {
        this.ver.y = utils.clamp(this.ver.y, this.ver.y, this.speed);
        this.bounce = true;
      }
    }
    this.pos.y += Math.ceil(this.ver.y * delta);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#CDDC39';
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
