import * as utils from './utils';

export default class Player {
  readonly canvas: HTMLCanvasElement;
  readonly width = 90;
  readonly height = 10;
  readonly radius = 3;
  ballCount = 10;
  angle: number;
  pos: Pos;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.pos = {
      x: (canvas.width / 2) - this.width,
      y: canvas.height - 100
    };
  }

  update(delta: number, mouse: Pos) {
    const targetX  = mouse.x - (this.pos.x + this.width + (this.height / 2));
    const targetY  = mouse.y - this.pos.y;
    const rotation = Math.atan2(targetY, targetX);
    // this.angle = utils.clamp(rotation, -Math.PI - 1, 0);
    this.angle = rotation;
  }

  draw(ctx: CanvasRenderingContext2D) {
    utils.writeMessage(ctx, this.angle);
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.pos.x + this.width, this.pos.y + (this.height / 2));

    let offset = 0;
    ctx.rotate(this.angle);

    for (let i = 0; i < this.ballCount; ++i) {
      offset = (this.radius * 5) * i;
      ctx.arc(offset, 0, this.radius, 0, Math.PI * 2);
    }
    ctx.fillStyle = '#0095DD';
    ctx.fill();

    // ctx.rotate(this.angle);
    // ctx.rect(0, 0, this.width, this.height);
    // ctx.fillStyle = '#0095DD';
    // ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
