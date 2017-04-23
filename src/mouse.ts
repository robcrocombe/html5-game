export default class Mouse {
  canvas: HTMLCanvasElement;
  pos: Vector;
  lastClicked: Vector;
  down: boolean;
  onRelease: Function;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.pos = { x: 0, y: 0 };
    this.lastClicked = { x: 0, y: 0 };
    this.down = false;

    window.addEventListener('mousedown', this.mousedown.bind(this));
    window.addEventListener('mouseup', this.mouseup.bind(this));
    window.addEventListener('mousemove', this.mousemove.bind(this));
  }

  getMousePos(e: MouseEvent): Vector {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  mousedown(e: MouseEvent) {
    this.down = true;
    this.lastClicked = this.getMousePos(e);
  }

  mouseup(e: MouseEvent) {
    this.down = false;
    if (this.onRelease) {
      this.onRelease();
    }
  }

  mousemove(e: MouseEvent) {
    this.pos = this.getMousePos(e);
  }
}
