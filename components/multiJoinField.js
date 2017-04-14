import React from 'react'
import reactStamp from 'react-stamp'
import styled from 'styled-components'

import MultiButton from './button'

const MultiJoin = {
  displayName: 'MultiJoin',

  render () {
    const { roomCode, joinField, onFormClick, onChange } = this.props

    if (!roomCode) {
      return (
        <div>
          <input type='text' value={joinField} onChange={(e) => onChange(e)}/>
          <MultiButton onClick={() => onFormClick()}>Join Game</MultiButton>
        </div>
      )
    } else {
      return null
    }
  }
}

export default reactStamp(React).compose(
  MultiJoin
)