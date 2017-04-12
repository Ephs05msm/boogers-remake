const sqEdge = 9

export default {
  get (turn, vector) {
    const address = vector.x + (vector.y * sqEdge)
    return turn.squares[address]
  }
}
