import React from 'react'
import reactStamp from 'react-stamp'
import styled from 'styled-components'

import MultiButton from './button'

const HostMulti = {
  displayName: 'MultiButton',

  render () {
    const { roomCode, onClick } = this.props

    if (!roomCode) {
        return (
        <MultiButton onClick={() => onClick()}>
          Host Game
        </MultiButton>
      )
    } else {
      return null
    }
  }
}

export default reactStamp(React).compose(
  HostMulti
)