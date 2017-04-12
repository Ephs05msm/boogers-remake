import React from 'react'
import reactStamp from 'react-stamp'
import styled from 'styled-components'

const MultiButton = {
  displayName: 'MultiButton',

  render () {
    const { onClick } = this.props

    const Button = styled.button`
      background: red;
      color: white;
      padding: 5px;
      border-radius: 3px;
      border: 2px solid red;
      font: 16px Futura, sans-serif;

      &:hover {
        background: blue;
        border: 2px solid blue;
      }
    `

    return (
      <Button onClick={() => onClick()}>
        Multiplayer
      </Button>
    )
  }
}

export default reactStamp(React).compose(
  MultiButton
)