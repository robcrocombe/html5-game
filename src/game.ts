import * as Victor from 'Victor';
import * as utils from './utils';
import Tile from './tile';
import Ball from './ball';

const xPadding = 150;
const yPadding = 20;

export function setTilePositions(canvas: HTMLCanvasElement, tiles: Tile[]) {
  let pos: Pos = { x: xPadding, y: yPadding };

  Tile.width = Math.floor((canvas.width - (xPadding * 2)) / Tile.rowLength);
  Tile.height = Tile.width;

  for (let i = tiles.length - 1; i >= 0; --i) {

    tiles[i].pos = {
      x: pos.x,
      y: pos.y
    };

    tiles[i].left   = Math.floor((canvas.width  - Tile.width)  / 2);
    tiles[i].top    = Math.floor((canvas.height - Tile.height) / 2);
    tiles[i].right  = tiles[i].left + Tile.width;
    tiles[i].bottom = tiles[i].top  + Tile.height;

    pos.x += Tile.width;

    if (i % Tile.rowLength === 0) {
      pos.x = xPadding;
      pos.y += Tile.height;
    }
  }
}

export function collisionDetection(canvas: HTMLCanvasElement, tiles: Tile[], balls: Ball[]) {
  for (let i = 0; i < tiles.length; ++i) {
    const tile = tiles[i];

    if (tile.health < 1) {
      continue;
    }

    for (let j = 0; j < balls.length; ++j) {
      const ball = balls[j];

      if (collides6(tile, ball)) {
        console.log('hit');
        balls[j] = null;
        return;
      }
    }
  }
}

// function collides1(tile: Tile, ball: Ball): boolean {
//   if (tile.pos.x < ball.pos.x + ball.width && tile.pos.x + Tile.width > ball.pos.x &&
//     tile.pos.y < ball.pos.y + ball.height && tile.pos.y + Tile.height > ball.pos.y) {
//     return true;
//   }
//   return false;
// }

// function collides2(tile: Tile, ball: Ball) {
//   const distX = Math.abs(ball.pos.x - tile.pos.x - Tile.width / 2);
//   const distY = Math.abs(ball.pos.y - tile.pos.y - Tile.height / 2);

//   if (distX > (Tile.width/2 + ball.radius)) { return false; }
//   if (distY > (Tile.height/2 + ball.radius)) { return false; }

//   if (distX <= (Tile.width/2)) { return true; }
//   if (distY <= (Tile.height/2)) { return true; }

//   const dx = distX - Tile.width / 2;
//   const dy = distY - Tile.height / 2;
//   return (dx*dx+dy*dy <= (ball.radius * ball.radius));
// }

// function collides3(tile: Tile, ball: Ball) {
//   if (collides2(tile, ball)) {
//     --tile.health;
//     // ball.ver.x = -ball.ver.x;
//     // ball.ver.y = -ball.ver.y;

//     const ballCenterX = ball.pos.x + ball.radius;
//     const ballCenterY = ball.pos.y + ball.radius;
//     const tileCenterX = tile.pos.x + (Tile.width / 2);
//     const tileCenterY = tile.pos.y + (Tile.height / 2);

//     const w = 0.5 * (ball.width + Tile.width);
//     const h = 0.5 * (ball.height + Tile.height);
//     const dx = ballCenterX - tileCenterX;
//     const dy = ballCenterY - tileCenterY;

//     if (Math.abs(dx) <= w && Math.abs(dy) <= h) {
//       /* collision! */
//       const wy = w * dy;
//       const hx = h * dx;

//       if (wy > hx) {
//         if (wy > -hx) {
//            collision at the top
//           ball.ver.y = -ball.ver.y;
//         } else {
//           /* on the left */
//           ball.ver.x = -ball.ver.x;
//         }
//       } else {
//         if (wy > -hx) {
//           /* on the right */
//           ball.ver.x = -ball.ver.x;
//         } else {
//           /* at the bottom */
//           ball.ver.y = -ball.ver.y;
//         }
//       }
//     }
//   }
// }

// function collides4(tile: Tile, ball: Ball) {
//   const c = collides5(tile, ball);

//   if (c) {
//     console.log(c);

//     --tile.health;

//     switch(c) {
//       case 'top':
//       case 'bottom':
//         ball.ver.y = -ball.ver.y;
//         break;
//       case 'left':
//       case 'right':
//         ball.ver.x = -ball.ver.x;
//         break;
//     }

//     ball.pos = ball.lastPos;
//   }
// }

// function collides5(r1: Tile, r2: Ball){
//   var dx=(r1.pos.x+Tile.width/2)-(r2.pos.x+r2.radius/2);
//   var dy=(r1.pos.y+Tile.height/2)-(r2.pos.y+r2.radius/2);
//   var width=(Tile.width+r2.radius)/2;
//   var height=(Tile.height+r2.radius)/2;
//   var crossWidth=width*dy;
//   var crossHeight=height*dx;
//   var collision=null;

//   if(Math.abs(dx)<=width && Math.abs(dy)<=height){
//     if (crossWidth>crossHeight){
//       collision=(crossWidth>(-crossHeight))?'bottom':'left';
//     } else {
//       collision=(crossWidth>-(crossHeight))?'right':'top';
//     }
//   }
//   return(collision);
// }

function collides6(tile: Tile, ball: Ball) {
  const center = new Victor(ball.pos.x, ball.pos.y);

  const aabb_half_extents = new Victor(Tile.width / 2, Tile.height / 2);

  const aabb_center = new Victor(tile.pos.x + aabb_half_extents.x, tile.pos.y + aabb_half_extents.y);

  let difference = center.clone().subtract(aabb_center);

  const clampedX = utils.clamp(difference.x, -aabb_half_extents.x, aabb_half_extents.x);
  const clampedY = utils.clamp(difference.y, -aabb_half_extents.y, aabb_half_extents.y);
  const clamped = new Victor(clampedX, clampedY);

  const closest = aabb_center.clone().add(clamped);

  difference = closest.clone().subtract(center);

  if (difference.length() < ball.radius) {
    console.log('hit ' + tile.health);
  }

  return false;
}

// function vectorLength(ver: Pos) {
//   return Math.sqrt(ver.x * ver.x + ver.y * ver.y);
// }

// function vectorDirection(ver: Pos) {
//   const compass = [
//     [0.0, 1.0], // Up
//     [1.0, 0.0], // Right
//     [0.0, -1.0], // Down
//     [-1.0, 0.0] // Left
//   ];

//   let max = 0;
//   let bestMatch = -1;

//   for (let i = 0; i < 4; ++i) {
//     let dotProduct = dotproduct(normalize(ver), compass[i]);
//     if (dotProduct > max) {
//       max = dotProduct;
//       bestMatch = i;
//     }
//   }

//   switch(bestMatch) {
//     case 0: return 'up';
//     case 1: return 'right';
//     case 2: return 'down';
//     case 3: return 'left';
//     default: return null;
//   }
// }

// function dotproduct(a,b) {
//   var n = 0, lim = Math.min(a.length,b.length);
//   for (var i = 0; i < lim; i++) n += a[i] * b[i];
//   return n;
// }

// function normalize(ver: Pos) {
//   const normal = ver;
//   var len = Math.sqrt(normal.x * normal.x + normal.y * normal.y)
//   normal.x /= len;
//   normal.y /= len;
//   return normal;
// }
