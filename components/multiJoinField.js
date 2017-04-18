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
        <form onSubmit={(e) => onFormClick(e)}>
          <input type='text' value={joinField} placeholder='Enter code' onChange={(e) => onChange(e)}/>
          <MultiButton type='submit'>Join Game</MultiButton>
          <style jsx>{`
            input {
              background: #d9d9d3;
              border-radius: 3px;
              width: 80px;
              padding: 5px;
              margin: 2px;
              font-weight: bold;
              text-align: center;
              border: 2px solid #7d87af;
            }
          `}</style>
        </form>
      )
    } else {
      return null
    }
  }
}

export default reactStamp(React).compose(
  MultiJoin
)