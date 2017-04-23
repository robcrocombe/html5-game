export default class Tile {
  static rowLength = 7;
  static padding = 3;
  width: number;
  height: number;
  health: number;
  canHit: boolean = true;
  pos: Vector;

  constructor() {
    this.health = this.getRandomInt(1, 5);
  }

  update(delta: number) {
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.health > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
      ctx.fillStyle = '#43A047';
      ctx.fill();
      this.drawHealth(ctx);
      ctx.closePath();
      ctx.restore();
    }
  }

  drawHealth(ctx: CanvasRenderingContext2D) {
    ctx.font = 'bold 16pt sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText(this.health.toString(), this.pos.x + (this.width / 2), this.pos.y + (this.height / 1.61));
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.round(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  setPosition(x: number, y: number, width: number, height: number) {
    this.pos = {
      x: x + Tile.padding,
      y: y + Tile.padding
    };

    this.width = width - (Tile.padding * 2);
    this.height = height - (Tile.padding * 2);
  }

  hit() {
    if (this.health > 0) {
      if (this.canHit) {
        --this.health;
        this.canHit = false;

        setTimeout(() => this.canHit = true, 100);
      }
    }
  }
}
