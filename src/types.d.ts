interface Vector {
  x: number
  y: number
}

interface BallSpawn {
  readonly rate: number
  start: boolean
  countdown: number
  next: number
}

/*
Idle - waiting for player control
Play Start - player can pick position and spawn balls
Ball Spawn - balls currently spawning
Playing - balls moving, tiles reacting
Play End - balls return to player
New Line - tiles spawn

..back to Idle
*/

declare const enum State {
  IDLE,
  PLAY_START,
  BALL_SPAWN,
  PLAYING,
  PLAY_END,
  NEW_LINE
}
