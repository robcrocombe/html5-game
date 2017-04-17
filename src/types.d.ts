interface Pos {
  x: number
  y: number
}

interface Mouse {
  pos: Pos
  lastClicked?: Pos
  down?: boolean
}
