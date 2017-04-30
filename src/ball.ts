import * as utils from './utils';

export default abstract class Ball {
  readonly canvas: HTMLCanvasElement;
  readonly width = 12;
  readonly height = 12;
  readonly radius = 6;
  readonly speed = 0.4;
  alive: boolean = false;
  pos: Vector;
  ver: Vector;
  lastPos: Vector;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  returnToPlayer(delta: number, playerX: number) {
    const distance = Math.abs(this.pos.x - playerX) * 0.1;

    if (this.pos.x > playerX + 10) {
      this.pos.x -= Math.ceil(utils.clamp(Math.abs(this.ver.x) * distance * delta, 1, 10));
    } else if (this.pos.x < playerX - 10) {
      this.pos.x += Math.ceil(utils.clamp(Math.abs(this.ver.x) * distance * delta, 1, 10));
    } else {
      this.ver.x = 0;
      this.pos.x = playerX;
      this.alive = false;
    }
  }

  abstract update(delta: number, playerX: number);

  abstract draw(ctx: CanvasRenderingContext2D);
}
