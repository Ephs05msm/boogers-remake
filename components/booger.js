import React from 'react'
import reactStamp from 'react-stamp'
import styled, { keyframes } from 'styled-components'

const Booger = {
  displayName: 'Booger',

  render () {
    const {
      value,
    } = this.props
    
    const p1Bright = '#f2e13f', p2Bright = '#7fd658'
    const rndTime = Math.round(Math.random() * 70) + 10
    const start = rndTime, mid = start + 5, end = mid + 5
    const breatheL = keyframes`
      ${start}% {
        r: 13px;
      }
      ${mid}% {
        r: 16px;
      }
      ${end}% {
        r: 13px;
      }
      100% {
        r: 13px;
      }
    `
    const breatheS = keyframes`
      ${start}% {
        r: 7px;
      }
      ${mid}% {
        r: 9px;
      }
      ${end}% {
        r: 7px;
      }
      100% {
        r: 7px;
      }
    `

    const Blob = styled.circle`
      @media (min-width: 430px) {
        cx: 18px;
        cy: 18px;
        r: 13px;

        fill: ${() => (value === 'X') ? p1Bright : p2Bright};
        animation: ${breatheL} 5s linear infinite;
      }

      @media (max-width: 429px) {
        cx: 10.5px;
        cy: 10.5px;
        r: 7px;

        fill: ${() => (value === 'X') ? p1Bright : p2Bright};
        animation: ${breatheS} 5s linear infinite;
      }
    `

    return (
      <Blob/>
    )
  }
}

export default reactStamp(React).compose(
  Booger
)