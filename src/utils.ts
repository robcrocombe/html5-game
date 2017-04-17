export function getMousePos(canvas: HTMLCanvasElement, e: MouseEvent): Pos {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

export function writeMessage(ctx: CanvasRenderingContext2D, message: any) {
  ctx.font = '15pt Calibri';
  ctx.fillStyle = 'black';
  ctx.fillText(message, 10, 25);
}

export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}
