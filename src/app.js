import loop from '../node_modules/mainloop.js/build/mainloop.min';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function update() {
}

function draw(delta) {
}

loop.setUpdate(update).setDraw(draw).start();
