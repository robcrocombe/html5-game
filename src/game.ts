// import * as Victor from 'Victor';
// import * as utils from './utils';
import Tile from './tile';
import Ball from './ball';

const xPadding = 150;
const yPadding = 100;

export function setTilePositions(canvas: HTMLCanvasElement, tiles: Tile[]) {
  let pos: Pos = { x: xPadding, y: yPadding };

  const width = Math.floor((canvas.width - (xPadding * 2)) / Tile.rowLength);
  const height = width;

  for (let i = tiles.length - 1; i >= 0; --i) {

    tiles[i].setPosition(pos.x, pos.y, width, height);

    // tiles[i].left   = Math.floor((canvas.width  - Tile.width)  / 2);
    // tiles[i].top    = Math.floor((canvas.height - Tile.height) / 2);
    // tiles[i].right  = tiles[i].left + Tile.width;
    // tiles[i].bottom = tiles[i].top  + Tile.height;

    pos.x += width;

    if (i % Tile.rowLength === 0) {
      pos.x = xPadding;
      pos.y += height;
    }
  }
}

export function collisionDetection(canvas: HTMLCanvasElement, tiles: Tile[], balls: Ball[]) {
  for (let i = 0; i < balls.length; ++i) {
    for (let j = 0; j < tiles.length; ++j) {
      const ball = balls[i];
      const tile = tiles[j];

      if (tile.health < 1 || ball.ver.x === 0) {
        continue;
      }

      if (collides4(tile, ball)) {
        collisionDetection(canvas, tiles, balls);
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
//   const distX = Math.abs(ball.pos.x - tile.pos.x - tile.width / 2);
//   const distY = Math.abs(ball.pos.y - tile.pos.y - tile.height / 2);

//   if (distX > (tile.width/2 + ball.radius)) { return false; }
//   if (distY > (tile.height/2 + ball.radius)) { return false; }

//   if (distX <= (tile.width/2)) { return true; }
//   if (distY <= (tile.height/2)) { return true; }

//   const dx = distX - tile.width / 2;
//   const dy = distY - tile.height / 2;
//   return (dx*dx+dy*dy <= (ball.radius * ball.radius));
// }

// function collides3(tile: Tile, ball: Ball) {
//   if (collides2(tile, ball)) {
//     // --tile.health;
//     // ball.ver.x = -ball.ver.x;
//     // ball.ver.y = -ball.ver.y;

//     const ballCenterX = ball.pos.x;
//     const ballCenterY = ball.pos.y;
//     const tileCenterX = tile.pos.x + (tile.width / 2);
//     const tileCenterY = tile.pos.y + (tile.height / 2);

//     const w = 0.5 * (ball.width + tile.width);
//     const h = 0.5 * (ball.height + tile.height);
//     const dx = ballCenterX - tileCenterX;
//     const dy = ballCenterY - tileCenterY;

//     if (Math.abs(dx) <= w && Math.abs(dy) <= h) {
//       /* collision! */
//       const wy = w * dy;
//       const hx = h * dx;

//       if (wy > hx) {
//         if (wy > -hx) {
//           /* collision at the top */
//           ball.ver.y = -ball.ver.y;
//           ball.pos.y = ball.lastPos.y;
//         } else {
//           /* on the left */
//           ball.ver.x = -ball.ver.x;
//           ball.pos.x = ball.lastPos.x;
//         }
//       } else {
//         if (wy > -hx) {
//           /* on the right */
//           ball.ver.x = -ball.ver.x;
//           ball.pos.x = ball.lastPos.x;
//         } else {
//           /* at the bottom */
//           ball.ver.y = -ball.ver.y;
//           ball.pos.y = ball.lastPos.y;
//         }
//       }
//     }
//   }
// }

function collides4(tile: Tile, ball: Ball) {
  const c = collides5(tile, ball);

  if (c) {
    tile.hit();

    switch(c) {
      case 'top':
      case 'bottom':
        ball.ver.y = -ball.ver.y;
        ball.pos.y = ball.lastPos.y;
        break;
      case 'left':
      case 'right':
        ball.ver.x = -ball.ver.x;
        ball.pos.x = ball.lastPos.x;
        break;
    }
  }
}

function collides5(r1: Tile, r2: Ball){
  var dx=(r1.pos.x+r1.width/2)-(r2.pos.x+r2.radius/2);
  var dy=(r1.pos.y+r1.height/2)-(r2.pos.y+r2.radius/2);
  var width=(r1.width+r2.radius)/2;
  var height=(r1.height+r2.radius)/2;
  var crossWidth=width*dy;
  var crossHeight=height*dx;
  var collision=null;

  if(Math.abs(dx)<=width && Math.abs(dy)<=height){
    if (crossWidth>crossHeight){
      collision=(crossWidth>(-crossHeight))?'bottom':'left';
    } else {
      collision=(crossWidth>-(crossHeight))?'right':'top';
    }
  }
  return(collision);
}

// function collides7(tile: Tile, ball: Ball) {
//   const collision = collides6(tile, ball);

//   if (collision) {
//     const dir = collision.direction;
//     const diff = collision.difference;

//     console.log(dir);

//     console.log('closest', collision.closest);
//     console.log('center', collision.center);
//     console.log('diff', diff.length());

//     // if (dir === 'right') {
//     //   ball.ver.x = 0;
//     //   ball.ver.y = 0;
//     // }

//     if (dir === 'left' || dir === 'right') {
//       ball.ver.x = -ball.ver.x;
//       ball.pos.x = ball.lastPos.x;

//       // const penetration = ball.radius - Math.abs(diff.x);

//       // if (dir === 'left') {
//       //   ball.pos.x += penetration;
//       // } else {
//       //   ball.pos.x -= penetration;
//       // }
//     } else {
//       ball.ver.y = -ball.ver.y;
//       ball.pos.y = ball.lastPos.y;

//       // const penetration = ball.radius - Math.abs(diff.y);

//       // if (dir === 'up') {
//       //   ball.pos.y += penetration;
//       // } else {
//       //   ball.pos.y -= penetration;
//       // }
//     }

//     // ball.ver.x = 0;
//     // ball.ver.y = 0;
//     console.log('health', tile.health);
//     // --tile.health;
//   }
// }

// function collides6(tile: Tile, ball: Ball) {
//   const center = new Victor(ball.pos.x, ball.pos.y);
//   const aabb_half_extents = new Victor(tile.width / 2, tile.height / 2);

//   const aabb_center = new Victor(tile.pos.x + aabb_half_extents.x, tile.pos.y + aabb_half_extents.y);

//   let difference = center.clone().subtract(aabb_center);

//   const clampedX = utils.clamp(difference.x, -aabb_half_extents.x, aabb_half_extents.x);
//   const clampedY = utils.clamp(difference.y, -aabb_half_extents.y, aabb_half_extents.y);
//   const clamped = new Victor(clampedX, clampedY);

//   const closest = aabb_center.clone().add(clamped);

//   tile.closest = {
//     x: closest.x,
//     y: closest.y
//   };

//   difference = closest.clone().subtract(center);

//   if (difference.length() <= ball.radius) {
//     const direction = vectorDirection(difference);
//     // if (difference.length() === 0) {
//     //   debugger;
//     // }

//     return { direction, difference, closest, center };
//   }
//   return false;
// }

// const compass = [
//   new Victor(0.0, -1.0), // Up
//   new Victor(1.0, 0.0), // Right
//   new Victor(0.0, 1.0), // Down
//   new Victor(-1.0, 0.0) // Left
// ];

// function vectorDirection(target: Pos) {
//   const vect = new Victor(target.x, target.y);
//   const normal = vect.normalize();
//   let max = 0;
//   let bestMatch = -1;

//   for (let i = 0; i < 4; ++i) {
//     const dotProduct = normal.dot(compass[i]);
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

// function collides8(tile: Tile, ball: Ball) {
//   if (collides2(tile, ball)) {
//     const int = intersection(tile, ball);
//     if (int) {
//       // If we hit on the top, go up
//       if ((ball.pos.y + ball.radius)<(int.y+(int.height/2))) {
//         ball.ver.y = -ball.ver.y;
//         ball.pos.y = ball.lastPos.y;
//       }
//       // If we hit on the bottom, go down
//       else if ((ball.pos.y+ball.radius)>(int.y+(int.height/2))) {
//         ball.ver.y = -ball.ver.y;
//         ball.pos.y = ball.lastPos.y;
//       }
//       // If we hit on the left side, go left
//       else if ((ball.pos.x+ball.radius)<(int.x+(int.width/2))) {
//         ball.ver.x = -ball.ver.x;
//         ball.pos.x = ball.lastPos.x;
//       }
//       // If we hit on the right side, go right
//       else if ((ball.pos.x+ball.radius)>(int.x+(int.width/2))) {
//         ball.ver.x = -ball.ver.x;
//         ball.pos.x = ball.lastPos.x;
//       }

//       tile.hit();
//       return true;
//     }
//   }
//   return false;
// }

// function intersection(r1: Tile, r2: Ball) {
//   const xmin = Math.max(r1.pos.x, r2.pos.x);
//   const xmax1 = r1.pos.x + r1.width;
//   const xmax2 = r2.pos.x + r2.width;
//   const xmax = Math.min(xmax1, xmax2);
//   if (xmax > xmin) {
//     const ymin = Math.max(r1.pos.y, r2.pos.y);
//     const ymax1 = r1.pos.y + r1.height;
//     const ymax2 = r2.pos.y + r2.height;
//     const ymax = Math.min(ymax1, ymax2);
//     if (ymax > ymin) {
//       const int = {
//         x: xmin,
//         y: ymin,
//         width: xmax - xmin,
//         height: ymax - ymin
//       };
//       return int;
//     }
//   }
//   return false;
// }
