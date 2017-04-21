import * as ml from 'mainloop.js';
import Player from './player';
import Ball from './ball';
import Tile from './tile';
import * as game from './game';
import * as utils from './utils';

const loop: MainLoop = ml;

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const player = new Player(canvas);

const tiles: Tile[] = [];

for (let i = 0; i < 14; ++i) {
  tiles.push(new Tile());
}

game.setTilePositions(canvas, tiles);

let ball: Ball;

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

  const pos: Pos = {
    x: player.pos.x + player.width,
    y: player.pos.y
  }

  ball = new Ball(canvas, pos, player.angle);
}

function mousemove(e: MouseEvent) {
  mouse.pos = utils.getMousePos(canvas, e);
}

function update(delta: number) {
  player.update(delta, mouse);
  if (ball) {
    ball.update(delta);
    game.collisionDetection(canvas, tiles, [ball]);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);
  if (ball) {
    ball.draw(ctx);
  }

  for (let i = 0; i < tiles.length; ++i) {
    tiles[i].draw(ctx);
  }

  utils.writeMessage(ctx, Math.round(loop.getFPS()));
}

loop.setUpdate(update).setDraw(draw).start();
