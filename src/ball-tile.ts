import Tile from './tile';

export default class BallTile extends Tile {
  radius = 10;

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  hit() {
  }
}
