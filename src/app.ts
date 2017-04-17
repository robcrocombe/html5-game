import * as MainLoop from 'mainloop.js';
import Player from './player';
import Ball from './ball';
import * as utils from './utils';

const loop: MainLoop = MainLoop;

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const player = new Player(canvas);

const ball = new Ball(canvas);

let mouse: Mouse = {
  pos: { x: 0, y: 0 },
  lastClicked: { x: 0, y: 0 },
  down: false
};

window.addEventListener('mousedown', mousedown);
window.addEventListener('mouseup', mouseup);
window.addEventListener('mousemove', mousemove);

function mousedown(e: MouseEvent) {
  mouse.down = true;
  mouse.lastClicked = utils.getMousePos(canvas, e);
}

function mouseup(e: MouseEvent) {
  mouse.down = false;
}

function mousemove(e: MouseEvent) {
  mouse.pos = utils.getMousePos(canvas, e);
}

function update(delta: number) {
  player.update(delta, mouse);
  ball.update(delta);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);
  ball.draw(ctx);
}

loop.setUpdate(update).setDraw(draw).start();
