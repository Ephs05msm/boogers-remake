import React from 'react'
import reactStamp from 'react-stamp'
import styled from 'styled-components'

const Sidebar = {
  displayName: 'Sidebar',

  multiStatus () {
    const { player, playerId, opponentConnected, roomCode } = this.props

    var MultiStatus = styled.div`
      color: white;
      font-size: 14px;
      padding: 2px;
    `

    if (roomCode && player === playerId.toString()) {
      return (
        <MultiStatus>
          You are connected!
        </MultiStatus>
      )
    } else if (roomCode && opponentConnected) {
      return (
        <MultiStatus>
          Opponent is connected!
        </MultiStatus>
      )
    } else {
      return null
    }
  },

  turnChat () {
    const { player, xIsNext, winner } = this.props
    const p1Bright = '#f2e13f', p1Dark = '#c8b357'
    const p2Bright = '#7fd658', p2Dark = '#46af32'

    const Bubble = styled.div`
      border: 2px solid ${() => (player === '1') ? p1Bright : p2Bright};
      background: #d9d9d3;
      text-align: center;
      padding: 2px;
      margin: 5px;
      font-size: 14px;
      width: 75px;
    `
    const OhJoy = styled.div`
      color: ${() => (player === '1') ? p1Bright : p2Bright};
      text-outline: 2px ${() => (player === '1') ? p1Dark : p2Dark};
      font-weight: bold;
    `
    const MyTurn = styled.div`
      color: ${() => (player === '1') ? p1Dark : p2Dark};
    `

    if (winner === 'X' && player === '1') {
      return (
        <Bubble>
          <OhJoy>HOORAY!</OhJoy>
          <MyTurn>I WIN!</MyTurn>
        </Bubble>
      )
    } else if (winner === 'O' && player === '2') {
      return (
        <Bubble>
          <OhJoy>HOORAY!</OhJoy>
          <MyTurn>I WIN!</MyTurn>
        </Bubble>
      )
    } else if (!winner && xIsNext && player === '1') {
      return (
        <Bubble>
          <OhJoy>OH JOY!</OhJoy>
          <MyTurn>IT'S MY TURN</MyTurn>
        </Bubble>
      )
    } else if (!winner && !xIsNext && player === '2') {
      return (
        <Bubble>
          <OhJoy>OH JOY!</OhJoy>
          <MyTurn>IT'S MY TURN</MyTurn>
        </Bubble>
      )
    }
  },

  render () {
    const { player, score, side } = this.props
    
    const playerStrg = 'Player ' + player
    const playerTag = 'p' + player
    
    return (
      <div className={side + ' sidebar'}>
        {this.multiStatus()}
        <div className={playerTag + ' scores'}>
          <div>{playerStrg}</div>
          <div className='bigNum'>{score}</div>
        </div>
        {this.turnChat()}
        <style jsx>{`
          .sidebar {
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;
            margin: 5px;
          }
          .left {
            grid-area: left;
          }

          .right {
            grid-area: right;
          }

          .scores {
            border: 2px solid #7d87af;
            display: flex;
            flex-direction: column;
            text-align: center;
            padding: 5px;
          }

          .bigNum {
            margin: 5px;
            font-size: 30px;
          }

          .p1 {
            color: #f2e13f;
            background-color: #c8b357;
          }

          .p2 {
            color: #7fd658;
            background-color: #46af32;
          }
        `}</style>
      </div>
    )
  }
}

export default reactStamp(React).compose(
  Sidebar
)