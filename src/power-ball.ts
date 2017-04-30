import Ball from './ball';

export default class PowerBall extends Ball {
  return: boolean = false;
  lastPos: Vector;

  constructor(canvas: HTMLCanvasElement, pos: Vector) {
    super(canvas);

    this.alive = true;
    this.pos = pos;
    this.ver = { x: 0, y: this.speed };
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
