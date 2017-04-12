import React from 'react'
import reactStamp from 'react-stamp'
import io from 'socket.io-client'

import BoogersTitle from './title'
import Sidebar from './sidebar'
import Board from './board'
import controls from '../mixins/controls'
import rules from '../mixins/rules'
import timeTravel from '../mixins/timeTravel'
import vectorActions from '../mixins/vectorActions'

const sqEdge = 9

const Game = {
  displayName: 'Game',

  state: {
    stepNumber: 0,
    player1Score: 2,
    player2Score: 2,
    xIsNext: true,
    history: [{
      squares: Array(Math.pow(sqEdge, 2)).fill(null).map((sq, ind) => {
        if (ind === 0 || ind === Math.pow(sqEdge, 2) - 1) {
          return 'X'
        } else if (ind === sqEdge - 1 || ind === Math.pow(sqEdge, 2) - sqEdge) {
          return 'O'
        } else {
          return null
        }
      })
    }],
    selected: null,
    possibleMoves: [],
    neighboringOpponents: [],
    winner: null
  },

  componentDidMount () {
    const socket = io()
  },

  componentDidUpdate (prevProps, prevState) {
    const { xIsNext: prevTurn } = prevState
    const { xIsNext } = this.state
    
    if (prevTurn !== xIsNext) {
      const socket = io()
      socket.emit('player move', xIsNext)
    }
  },

  render () {
    const {
      stepNumber,
      history,
      xIsNext,
      player1Score, player2Score,
      selected,
      possibleMoves, neighboringOpponents,
      winner } = this.state

    const current = history[stepNumber]

    return (
        <div className='game'>
          <BoogersTitle />
          <Board
            sqEdge={sqEdge}
            xIsNext={xIsNext}
            squares={current.squares}
            selected={selected}
            moves={possibleMoves}
            neighbors={neighboringOpponents}
            onClick={(i) => this.handleClick(i)}
            onMouseOver={(i) => this.previewResults(i)} 
          />
          <Sidebar
            player='1'
            score={player1Score}
            side='left'
            xIsNext={xIsNext}
            winner={winner} 
          />
          <Sidebar
            player='2'
            score={player2Score}
            side='right'
            xIsNext={xIsNext}
            winner={winner} 
          />
          <div className='game-info'>
            <div className='turn-status'>Move List</div>
            <ol>{this.listMoves()}</ol>
          </div>
          <style jsx>{`
            ol, ul {
              list-style-type: none;
              margin: 5px;
              padding: 0px;
              color: white;
            }

            .game {
              font-size: 16px;
              font-family: Futura, sans-serif;
              background-color: #09530a;
              padding: 5px;
              padding-bottom: 15px;
            }

            @media (min-width: 768px) {
              .game {
                display: grid;
                grid-template-columns: auto auto auto auto;
                grid-template-rows: auto auto;
                grid-template-areas:
                  'header header header .'
                  'left main right movelist';
              }

              .game-info {
                height: 400px;
                overflow: auto;
              }
            }

            @media (max-width: 767px) {
              .game {
                display: grid;
                grid-template-columns: auto auto;
                grid-template-rows: auto auto auto auto;
                grid-template-areas:
                  'header header'
                  'left right'
                  'main main'
                  'movelist movelist';
                justify-items: center;
              }
            }

            .game-info {
              grid-area: movelist;
              display: flex;
              flex-direction: column;
              justify-content: start;
              align-items: center;
              color: white;
            }
          `}</style>
        </div> 
    )
  }
}

export default reactStamp(React).compose(
  Game,
  controls,
  rules,
  timeTravel,
  vectorActions
)
