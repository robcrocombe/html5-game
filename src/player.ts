import * as utils from './utils';
import Mouse from './mouse';

export default class Player {
  readonly canvas: HTMLCanvasElement;
  readonly width = 90;
  readonly height = 10;
  readonly radius = 5;
  ballCount = 10;
  distance = 5;
  angle: number;
  pos: Vector;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.pos = {
      x: (canvas.width / 2) - this.width,
      y: canvas.height - this.height
    };
  }

  update(delta: number, mouse: Mouse) {
    if (mouse.down) {
      const targetX  = mouse.pos.x - (this.pos.x + this.width + (this.height / 2));
      const targetY  = mouse.pos.y - this.pos.y;
      const rotation = Math.atan2(targetY, targetX);

      if (rotation > 0) {
        this.angle = Math.PI + rotation;
      } else {
        this.angle = rotation;
      }

      let dist = utils.distance(mouse.lastClicked, mouse.pos);
      dist = dist * 0.04;
      this.distance = utils.clamp(dist, 0, 10);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.pos.x + this.width, this.pos.y + (this.height / 2));

    let offset = 0;
    ctx.rotate(this.angle);

    for (let i = 0; i < this.ballCount; ++i) {
      offset = (this.radius * this.distance) * i;
      ctx.moveTo(offset + (this.radius / 2.5), -this.radius);
      ctx.lineTo(offset + (this.radius / 2.5), this.radius);
      ctx.lineTo(offset + (this.radius * 2.5), 0);
    }

    ctx.fillStyle = '#0095DD';
    ctx.fill();

    ctx.closePath();
    ctx.restore();
  }
}
