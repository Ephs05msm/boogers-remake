import React from 'react'
import reactStamp from 'react-stamp'
import styled from 'styled-components'
import io from 'socket.io-client'

import BoogersTitle from './title'
import Sidebar from './sidebar'
import Board from './board'
import MultiMenu from './multiMenu'
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
    socket: null,
    roomCode: null,
    joinField: '',
    multiError: null,
    playerId: null,
    opponentConnected: false,
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

    socket.on('ready', () => {
      this.setState({
        opponentConnected: true
      })
    })

    socket.on('unready', () => {
      this.setState({
        opponentConnected: false
      })
    })

    socket.on('update board', (squares, turn) => {
      this.handleMultiMove(squares, turn)
    })

    this.setState({
      socket: socket
    })
  },

  componentDidUpdate (prevProps, prevState) {
    const { xIsNext: prevTurn, stepNumber: prevStep } = prevState
    const { socket, playerId, xIsNext, roomCode, stepNumber, history } = this.state
    const prevPlayer = prevTurn ? 1 : 2

    if (prevPlayer === playerId && prevStep !== stepNumber) {
      socket.emit('player move', roomCode, xIsNext, history[stepNumber].squares)
    }
  },

  render () {
    const {
      socket,
      roomCode,
      joinField,
      multiError,
      playerId,
      opponentConnected,
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
          <MultiMenu
            multiError={multiError}
            roomCode={roomCode}
            joinField={joinField}
            onClick={() => this.newRoomCode()}
            onFormClick={(e) => this.handleFormClick(e)}
            onChange={(e) => this.handleFormChange(e)}
          />
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
            playerId={playerId}
            opponentConnected={opponentConnected}
            roomCode={roomCode}
          />
          <Sidebar
            player='2'
            score={player2Score}
            side='right'
            xIsNext={xIsNext}
            winner={winner}
            playerId={playerId}
            opponentConnected={opponentConnected}
            roomCode={roomCode}
          />
          <MoveList
            roomCode={roomCode}
            listMoves={() => this.listMoves()} />
          <style jsx>{`
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
                grid-template-rows: auto auto auto;
                grid-template-areas:
                  'header header header .'
                  'left main right movelist'
                  'multi multi multi .';
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
