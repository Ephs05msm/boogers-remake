import React from 'react'
import reactStamp from 'react-stamp'
import styled from 'styled-components'

import MultiHost from './multiHost'
import MultiJoin from './multiJoinField'

const MultiMenu = {
  displayName: 'MultiMenu',

  multiErrMsg () {
    const { joinField, multiError } = this.props
    const ErrorRow = styled.div`
      color: red;
      font-size: 14px;
      margin: 5px;
    `

    if (multiError) {
      return (
        <ErrorRow>
          {multiError}
        </ErrorRow>
      )
    } else {
      return null
    }
  },

  render () {
    const {
      roomCode,
      joinField,
      onClick,
      onFormClick,
      onChange } = this.props

    if (!roomCode) {
      return (
        <div className='multi'>
          <div className='row1'>
            <MultiJoin
              roomCode={roomCode}
              joinField={joinField}
              onFormClick={(e) => onFormClick(e)}
              onChange={(e) => onChange(e)}
            />
            <span>&nbsp;or&nbsp;</span>
            <MultiHost roomCode={roomCode} onClick={() => onClick()} />
          </div>
          {this.multiErrMsg()}
          <style jsx>{`
            .multi {
              grid-area: multi;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              color: white;
            }
            .row1 {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
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
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              color: white;
              padding: 5px;
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