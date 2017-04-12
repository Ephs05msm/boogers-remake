import React from 'react'
import reactStamp from 'react-stamp'

import Square from './square'

const Board = {

  displayName: 'Board',

  renderSquare(i) {
    const {
      squares,
      xIsNext,
      selected,
      onClick,
      onMouseOver,
      moves,
      neighbors } = this.props

    return <Square
              key={i}
              xIsNext={xIsNext}
              value={squares[i]}
              selected={selected}
              moves={moves}
              neighbors={neighbors}
              onClick={() => onClick(i)}
              onMouseOver={() => onMouseOver(i)}
              address={i}
             />
  },

  boardLayout(length) {
    const { sqEdge } = this.props
    const boardRows = []
    for (let y = 0; y < sqEdge; y++) {
      const rowSquares = []
      for (let x = 0; x < sqEdge; x++) {
        rowSquares.push(this.renderSquare(x + (y * sqEdge)))
      }

      boardRows.push(
        <div key={y} className='board-row'>
          {rowSquares}
        </div>
      )
    }

    return boardRows
  },

  render() {
    const { sqEdge } = this.props
    
    return (
      <div className='board-edge'>
        <div className='board'>
          {this.boardLayout(sqEdge)}
        </div>
        <style jsx>{`
          .board-edge {
            grid-area: main;
            justify-self: center;
            align-self: start;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            background: #f0b7a1; /* Old browsers */
            background: -moz-linear-gradient(
              top, #f0b7a1 0%, #8c3310 50%, #752201 51%, #bf6e4e 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(
              top, #f0b7a1 0%,#8c3310 50%,#752201 51%,#bf6e4e 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(
              to bottom, #f0b7a1 0%,#8c3310 50%,#752201 51%,#bf6e4e 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            padding: 10px;
            margin: 5px;
          }

          .board {
            padding: 15px;
            background: #7abcff;
          }
          
          .board-row:after {
            display: table;
          }
        `}</style>
      </div>
    )
  }
}

export default reactStamp(React).compose(
  Board
)
