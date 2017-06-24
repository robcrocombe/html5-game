interface Vector {
  x: number
  y: number
}

interface BallSpawn {
  readonly rate: number
  countdown: number
  next: number
}

/*
Idle - waiting for player control
Play Start - player can pick position and spawn balls
Ball Spawn - balls currently spawning
Playing - balls moving, tiles reacting
Power Return - new powerups return to player
New Line - tiles spawn
Line move - tiles move down 1 row

..back to Idle
*/

declare const enum State {
  IDLE,
  PLAY_START,
  BALL_SPAWN,
  PLAYING,
  PWR_RETURN,
  NEW_LINE,
  MOVE_LINE
}
