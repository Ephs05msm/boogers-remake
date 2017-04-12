export default {
  calculateWinner(squares) {
    const { player1Score, player2Score } = this.state
    const emptyCount = squares.filter((sq) => sq === null).length
    const xCount = squares.filter((sq) => sq === 'X').length
    const oCount = squares.filter((sq) => sq === 'O').length
    const xMoves = squares
      .map((boog, ind) => boog === 'X' ? ind : null )
      .filter((ind) => ind !== null)
      .some((ind) => this.possibleMoves(ind).length > 0)
    const oMoves = squares
      .map((boog, ind) => boog === 'O' ? ind : null )
      .filter((ind) => ind !== null)
      .some((ind) => this.possibleMoves(ind).length > 0)

    if (emptyCount === 0 || 
        xCount === 0 || oCount === 0 ||
        !xMoves || !oMoves) {
      return player1Score > player2Score ? 'X' : 'O'
    } else {
      return null
    }
  },

  calculateScores(squares, player) {
    return squares.filter((sq) => {
      return sq === player
    }).length
  }
}