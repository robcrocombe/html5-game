export default abstract class Tile {
  static rowLength = 7;
  static padding = 3;
  static rerender: boolean = true;
  abstract readonly isMob: boolean;
  health: number;
  width: number;
  height: number;
  pos: Vector;

  setPosition(x: number, y: number, width: number, height: number) {
    this.pos = {
      x: x + Tile.padding,
      y: y + Tile.padding
    };

    this.width = width - (Tile.padding * 2);
    this.height = height - (Tile.padding * 2);
  }

  abstract draw(ctx: CanvasRenderingContext2D);

  abstract hit();
}
