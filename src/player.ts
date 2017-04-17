export default class Player {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
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

  update(delta: number) {
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.pos.x + this.width, this.pos.y + (this.height / 2));
    ctx.rotate(-90 * Math.PI / 180);
    ctx.rect(0, 0, this.width, this.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
