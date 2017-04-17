// import * as utils from './utils';

export default class Ball {
  readonly canvas: HTMLCanvasElement;
  readonly width = 10;
  readonly height = 10;
  readonly radius = 5;
  pos: Pos;
  speed: Pos = { x: 0.2, y: 0.2 };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.pos = {
      x: (canvas.width / 2) - (this.width / 2),
      y: (canvas.height / 2) - (this.height / 2)
    };
  }

  update(delta: number) {
    if (this.pos.x + this.speed.x > this.canvas.width - this.radius
      || this.pos.x + this.speed.x < this.radius) {
        this.speed.x = -this.speed.x;
    }
    if (this.pos.y + this.speed.y > this.canvas.height - this.radius
      || this.pos.y + this.speed.y < this.radius) {
        this.speed.y = -this.speed.y;
    }

    this.pos.x += this.speed.x * delta;
    this.pos.y += this.speed.y * delta;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // ctx.save();
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#D32F2F";
    ctx.fill();
    ctx.closePath();
    // ctx.restore();
  }
}
