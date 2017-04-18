import React from 'react'
import reactStamp from 'react-stamp'
import styled from 'styled-components'

import MultiButton from './button'

const HostMulti = {
  displayName: 'MultiButton',

  render () {
    const { roomCode } = this.props

    if (!roomCode) {
        return (
        <MultiButton>
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