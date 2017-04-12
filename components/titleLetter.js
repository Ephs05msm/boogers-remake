import React from 'react'
import reactStamp from 'react-stamp'
import styled from 'styled-components'

const TitleLetter = {
  displayName: 'TitleLetter',

  render () {
    const { letter, color, rotation } = this.props
    const RotatedLetter = styled.span`
      color: ${color};
      -webkit-transform: rotate(${rotation}deg);
      transform: rotate(${rotation}deg);

      margin: 2px;
      font: bold 35px 'Comic Sans MS', sans-serif;
    `

    return (
      <RotatedLetter>
        {letter}
      </RotatedLetter>
    )
  }
}

export default reactStamp(React).compose(
  TitleLetter
)