export default class Player {
  width: number;
  height: number;
  pos: Pos;

  constructor(canvas: HTMLCanvasElement) {
    this.width = 90;
    this.height = 10;
    this.pos = {
      x: (canvas.width - this.width) / 2,
      y: canvas.height - 200
    };
  }

  update(delta: number) {
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    // ctx.translate();
    ctx.rotate(0.17);
    ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
