export default {
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
      selected: null
    })
  },

  listMoves() {
    const { history, stepNumber } = this.state

    const moves = history.map((step, move) => {
      let winner = this.calculateWinner(step.squares)
      let desc = winner ? 'Game end' :
                 move ? ('Move #' + move) :
                 'Game start'
      return (
        <li key={move} className={move === stepNumber ? 
                                'selected' : 'unselected'}>
          <a href="#" onClick={() => this.jumpTo(move)}>
            {desc}
          </a>
          <style jsx>{`
            a {
              color: white;
            }

            .selected {
              font-weight: bold;
            }

            .unselected {
              font-weight: normal;
            }
          `}</style>
        </li>
      )
    })

    return moves
  }
}