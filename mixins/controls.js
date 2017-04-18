import Vector from '../helpers/vectors'

const sqEdge = 9

export default {
  handleClick (i) {
    const { selected, playerId, xIsNext } = this.state
    const currentTurn = xIsNext ? 1 : 2

    if (currentTurn !== playerId) {
      return
    } else if (selected || selected === 0) {
      this.handleSelected(i)
    } else {
      this.handleSelect(i)
    }
  },

  handleSelect (i) {
    const { stepNumber, history, xIsNext, winner, selected } = this.state
    const revHist = history.slice(0, stepNumber + 1)
    const current = history[stepNumber]
    const squares = current.squares.slice()

    const opponent = xIsNext ? 'O' : 'X'

    if (winner || // game is over
        squares[i] === opponent || // opponent square
        !squares[i]) { // empty square
      return
    }

    if (!this.friendlyCanMove(i)) {
      return
    }

    this.setState({
      possibleMoves: this.possibleMoves(i),
      selected: i
    })
  },

  handleSelected(i) {
    const { xIsNext, stepNumber, selected, possibleMoves } = this.state
    const history = this.state.history.slice()
    const current = history[stepNumber]
    const squares = current.squares.slice()

    // unselect?
    if (selected === i) {
      this.setState({
        selected: null,
      })
    } else if (squares[i] === (xIsNext ? 'X' : 'O')) {
      // selected another friendly?
      this.handleSelect(i)
    } else {
      if (possibleMoves.includes(i)) {
        const srcV = this.getVec(selected)
        const tgtV = this.getVec(i)

        tgtV.x === srcV.x + 2 ||
        tgtV.x === srcV.x - 2 ||
        tgtV.y === srcV.y + 2 ||
        tgtV.y === srcV.y - 2 ? this.handleMove(i, 'jump', selected) :
                                this.handleMove(i, 'multiply', selected)
      }
    }
  },

  friendlyCanMove (i) {
    return this.possibleMoves(i).length > 0 ? true : false
  },

  getBounds (i, radius) {
    const vec = this.getVec(i)

    return {
      yLow: vec.y - radius < 0 ? 0 : vec.y - radius,
      xLow: vec.x - radius < 0 ? 0 : vec.x - radius,
      yHigh: vec.y + radius < sqEdge ? vec.y + radius : sqEdge - 1,
      xHigh: vec.x + radius < sqEdge ? vec.x + radius : sqEdge - 1
    }
  },

  possibleMoves (i) {
    const { stepNumber, history, xIsNext } = this.state
    const current = history[stepNumber]
    const squares = current.squares.slice()

    const { yLow, xLow, yHigh, xHigh } = this.getBounds(i, 2)
    const possibleMoves = []

    for (let y = yLow; y <= yHigh; y++) {
      for (let x = xLow; x <= xHigh; x++) {
        let neighbor = this.get(current, Vector({x: x, y: y}))
        if (neighbor === null) {
          possibleMoves.push(x + (y * sqEdge))
        }
      }
    }
    return possibleMoves
  },

  neighboringOpponents (i) {
    const { stepNumber, history, xIsNext } = this.state
    const current = history[stepNumber]
    const squares = current.squares.slice()
    const opponent = xIsNext ? 'O' : 'X'

    const { yLow, xLow, yHigh, xHigh } = this.getBounds(i, 1)
    const opponents = []

    for (let y = yLow; y <= yHigh; y++) {
      for (let x = xLow; x <= xHigh; x++) {
        let neighbor = this.get(current, Vector({x: x, y: y}))
        if (neighbor === opponent) {
          opponents.push(x + (y * sqEdge))
        }
      }
    }
    return opponents
  },

  previewResults (tgt) {
    const { selected, possibleMoves, neighboringOpponents } = this.state
    if (!selected) {
      return null
    } else if (possibleMoves.includes(tgt)) {
      this.setState({
        neighboringOpponents: this.neighboringOpponents(tgt)
      })
    }
  },

  handleMove (tgt, type, src) {
    const { stepNumber, xIsNext } = this.state
    const history = this.state.history.slice(0, stepNumber + 1)
    const current = history[stepNumber]
    const squares = current.squares.slice()

    squares[tgt] = xIsNext ? 'X' : 'O'

    const opponents = this.neighboringOpponents(tgt)
    opponents.forEach((opp) => {
      squares[opp] = xIsNext ? 'X' : 'O'
    })

    if (type === 'jump') { squares[src] = null }

    const winner = this.calculateWinner(squares)

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !xIsNext,
      stepNumber: history.length,
      selected: null,
      player1Score: this.calculateScores(squares, 'X'),
      player2Score: this.calculateScores(squares, 'O'),
      possibleMoves: [],
      neighboringOpponents: [],
      winner: winner
    })
  },

  getVec (i) {
    const y = Math.floor(i / sqEdge)
    const x = i % sqEdge

    return Vector({x: x, y: y})
  }
}