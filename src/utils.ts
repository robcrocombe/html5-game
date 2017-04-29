export function writeMessage(ctx: CanvasRenderingContext2D, message: any) {
  ctx.font = '15pt Calibri';
  ctx.fillStyle = '#fff';
  ctx.fillText(message, 10, 25);
}

export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export function distance(p1: Vector, p2: Vector): number {
  return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}
