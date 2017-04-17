import * as MainLoop from 'mainloop.js';
import Player from './player';

const loop: MainLoop = MainLoop;

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const player = new Player(canvas);

function update(delta: number) {
  player.update(delta);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);
}

loop.setUpdate(update).setDraw(draw).start();
