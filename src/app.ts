import * as MainLoop from 'mainloop.js';
import Player from './player';
import * as utils from './utils';

const loop: MainLoop = MainLoop;

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const player = new Player(canvas);

let mouse: Pos = { x: 0, y: 0 };

window.addEventListener('mousemove', setMousePos);

function setMousePos(e: MouseEvent) {
  mouse = utils.getMousePos(canvas, e);
}

function update(delta: number) {
  player.update(delta, mouse);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);
}

loop.setUpdate(update).setDraw(draw).start();
