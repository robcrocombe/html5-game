export default class RenderCache {
  readonly canvas: HTMLCanvasElement;
  readonly context: CanvasRenderingContext2D;

  constructor(width: number, height: number) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext('2d');
  }

  draw(ctx: CanvasRenderingContext2D, rerender: boolean, renderFunc: Function) {
    if (rerender) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      renderFunc(this.context);
      rerender = false;
    }
    ctx.drawImage(this.canvas, 0, 0);
    return rerender;
  }
}
