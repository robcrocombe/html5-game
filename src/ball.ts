// import * as utils from './utils';
import Player from './player';

export default class Ball {
  readonly canvas: HTMLCanvasElement;
  readonly width = 10;
  readonly height = 10;
  readonly radius = 5;
  readonly speed = 0.4;
  alive: boolean = false;
  pos: Vector;
  ver: Vector;
  angle: number;
  lastPos: Vector;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.pos = { x: -100, y: -100 };
    this.ver = { x: 0, y: 0 };
  }

  reset(player: Player) {
    this.pos = {
      x: player.pos.x + player.width,
      y: player.pos.y
    };
    // this.angle = angle;
    this.ver = {
      x: Math.cos(player.angle) * this.speed,
      y: Math.sin(player.angle) * this.speed
    };

    this.alive = true;
  }

  update(delta: number) {
    if (this.pos.x + this.ver.x > this.canvas.width - this.radius
      || this.pos.x + this.ver.x < this.radius) {
        this.ver.x = -this.ver.x;
    }
    if (this.pos.y + this.ver.y < this.radius) {
        this.ver.y = -this.ver.y;
    }
    if (this.pos.y + this.ver.y > this.canvas.height - this.radius) {
      this.alive = false;
      this.ver.x = 0;
      this.ver.y = 0;
      return;
    }
    // if (this.pos.x + this.radius > this.canvas.width
    //   || this.pos.x < this.radius) {
    //     this.angle = Math.PI - this.angle;
    // }
    // if (this.pos.y + this.radius > this.canvas.height
    //   || this.pos.y < this.radius) {
    //     this.angle = (Math.PI * 2) - this.angle;
    // }

    this.lastPos = {
      x: this.pos.x,
      y: this.pos.y
    };

    this.pos.x += this.ver.x * delta;
    this.pos.y += this.ver.y * delta;
    // const xunits = Math.cos(this.angle) * this.speed;
    // const yunits = Math.sin(this.angle) * this.speed;
    // this.pos.x += xunits;
    // this.pos.y += yunits;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#D32F2F';
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
