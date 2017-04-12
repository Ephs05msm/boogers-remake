import React from 'react'
import reactStamp from 'react-stamp'
import io from 'socket.io-client'

import Game from '../components/game'

const Page = {
  displayName: 'Page',

  componentDidMount () {
    const socket = io()
  },

  render () {
    return (
      <Game />
    )
  }
}

export default reactStamp(React).compose(
  Page
)
