import React from 'react'
import reactStamp from 'react-stamp'
import styled from 'styled-components'
import io from 'socket.io-client'

import BoogersTitle from './title'
import Sidebar from './sidebar'
import Board from './board'
import MultiButton from './multibutton'
import MoveList from './movelist'
import timeTravel from '../mixins/timeTravel'
import multiplayer from '../mixins/multiplayer'
import controls from '../mixins/controls'
import rules from '../mixins/rules'
import vectorActions from '../mixins/vectorActions'

const sqEdge = 9

const Game = {
  displayName: 'Game',

  state: {
    roomCode: null,
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
      roomCode,
      stepNumber,
      history,
      xIsNext,
      player1Score, player2Score,
      selected,
      possibleMoves, neighboringOpponents,
      winner } = this.state

    const current = history[stepNumber]

    const CodeSpan = styled.span`
      display: ${() => roomCode ? 'inline' : 'none' }
      margin: 5px;
    `

    return (
        <div className='game'>
          <BoogersTitle />
          <div className='multi'>
            <MultiButton onClick={() => this.newRoomCode()} />
            <CodeSpan>Room Code: {roomCode}</CodeSpan>
          </div>
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
          <MoveList
            roomCode={roomCode}
            listMoves={() => this.listMoves()} />
          <style jsx>{`
            ol, ul {
              list-style-type: none;
              margin: 5px;
              padding: 0px;
              color: white;
            }

            .game {
              font: 16px Futura, sans-serif;
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
                  'header header header multi'
                  'left main right movelist';
              }
            }

            @media (max-width: 767px) {
              .game {
                display: grid;
                grid-template-columns: auto auto;
                grid-template-rows: auto auto auto auto auto;
                grid-template-areas:
                  'header header'
                  'multi multi'
                  'left right'
                  'main main'
                  'movelist movelist';
                justify-items: center;
              }
            }

            .multi {
              grid-area: multi;
              display: flex,
              flex-direction: row;
              justify-content: center;
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
  vectorActions,
  multiplayer
)
