import Player from './player';
import Ball from './ball';

export default class PlayerBall extends Ball {
  return: boolean = false;
  lastPos: Vector;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

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

  update(delta: number, playerX: number) {
    if (this.pos.x + this.ver.x > this.canvas.width - this.radius
      || this.pos.x + this.ver.x < this.radius) {
        this.ver.x = -this.ver.x;
    }
    if (this.pos.y + this.ver.y < this.radius) {
        this.ver.y = -this.ver.y;
    }
    if (this.pos.y + this.ver.y >= this.canvas.height - this.radius) {
      if (!this.return) {
        this.return = true;
        this.ver.y = 0;
      }
      if (playerX) {
        this.returnToPlayer(delta, playerX);
        return;
      } else {
        this.ver.x = 0;
        this.alive = false;
      }
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

    this.pos.x += Math.ceil(this.ver.x * delta);
    this.pos.y += Math.ceil(this.ver.y * delta);
    // const xunits = Math.cos(this.angle) * this.speed;
    // const yunits = Math.sin(this.angle) * this.speed;
    // this.pos.x += xunits;
    // this.pos.y += yunits;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#F44336';
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
