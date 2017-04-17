import * as utils from './utils';

export default class Player {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  angle: number;
  pos: Pos;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = 90;
    this.height = 10;
    this.pos = {
      x: (canvas.width / 2) - this.width,
      y: canvas.height
    };
  }

  update(delta: number, mouse: Pos) {
    const targetX  = mouse.x - this.pos.x
    const targetY  = mouse.y - this.pos.y
    const rotation = Math.atan2(targetY, targetX);
    this.angle = utils.clamp(rotation, -Math.PI, 0);
  }

  draw(ctx: CanvasRenderingContext2D) {
    utils.writeMessage(ctx, this.angle);
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.pos.x + this.width, this.pos.y + (this.height / 2));
    ctx.rotate(this.angle);
    ctx.rect(0, 0, this.width, this.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
