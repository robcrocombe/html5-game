import * as ml from 'mainloop.js';
import * as state from './state';

const loop: MainLoop = ml;

// window.addEventListener('focus', () => {
//   loop.start();
// }, false);

// window.addEventListener('blur', () => {
//   loop.stop();
// }, false);

function draw() {
  state.draw(loop.getFPS());
}

loop.setUpdate(state.update).setDraw(draw).start();
