import React from 'react'
import reactStamp from 'react-stamp'
import styled from 'styled-components'

import MultiHost from './multiHost'
import MultiJoin from './multiJoinField'

const MultiMenu = {
  displayName: 'MultiMenu',

  render () {
    const { roomCode, joinField, onClick, onFormClick, onChange } = this.props

    if (!roomCode) {
      return (
        <div className='multi'>
          <MultiJoin
            roomCode={roomCode}
            joinField={joinField}
            onFormClick={() => onFormClick()}
            onChange={(e) => onChange(e)}
          />
          <MultiHost roomCode={roomCode} onClick={() => onClick()} />
          <style jsx>{`
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
    } else {
      return (
        <div className='multi'>
          <span>Game Code: {roomCode}</span>
          <style jsx>{`
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
}

export default reactStamp(React).compose(
  MultiMenu
)