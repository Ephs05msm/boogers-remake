import React from 'react'
import reactStamp from 'react-stamp'

const MoveList = {
  displayName: 'MoveList',

  render () {
    const { roomCode, listMoves } = this.props

    if (!roomCode) {
      return (
        <div className='game-info'>
          <div className='turn-status'>Move List</div>
          <ol>{listMoves()}</ol>
          <style jsx>{`
            .game-info {
              grid-area: movelist;
              display: flex;
              flex-direction: column;
              justify-content: start;
              align-items: center;
              color: white;
            }

            @media (min-width: 768px) {
              .game-info {
                height: 400px;
                overflow: auto;
              }
            }
          `}</style>
        </div>
      )
    } else {
      return null
    }
  }
}

export default reactStamp(React).compose(
  MoveList
)