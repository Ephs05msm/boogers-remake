import React from 'react'
import reactStamp from 'react-stamp'
import styled, { keyframes } from 'styled-components'

import BoogerFrame from './boogerFrame'

const Square = {
  displayName: 'Square',

  render () {
    const {
      value,
      xIsNext,
      selected,
      moves,
      neighbors,
      onClick,
      onMouseOver,
      address } = this.props

    const sqBkgrd = (address % 2) ? ' light' : ' dark'
    const boogCol = (value === 'X') ? ' p1' : ' p2'

    const turn = xIsNext ? ' p1' : ' p2'
    const moveSq = (selected !== null && moves.includes(address)) ?
      turn + 'move' :
      ''

    const selClass = boogCol + (selected === address ? 'sel' : '')

    const oppSq = (selected !== null && neighbors.includes(address)) ?
      turn + 'move' :
      ''

    const classStrg = 'square' + sqBkgrd 
                      + boogCol + selClass + moveSq + oppSq

    return (
      <button
        className={classStrg}
        onClick={() => onClick()}
        onMouseOver={() => onMouseOver()}
      >
        <BoogerFrame value={value}/>
        <style jsx>{`
          .square {
            border: 2px solid #7d87af;
            float: left;
            margin-right: -2px;
            margin-top: -2px;
            padding: 0;
          }

          @media (min-width: 430px) {
            .square {
              height: 40px;
              width: 40px;
            }
          }

          @media (max-width: 429px) {
            .square {
              height: 25px;
              width: 25px;
            }
          }

          .light {
            background: #f0f9ff; /* Old browsers */
            background: -moz-linear-gradient(
              top, #f0f9ff 0%, #cbebff 47%, #a1dbff 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(
              top, #f0f9ff 0%,#cbebff 47%,#a1dbff 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(
              to bottom, #f0f9ff 0%,#cbebff 47%,#a1dbff 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          }

          .dark {
            background: #7abcff; /* Old browsers */
            background: -moz-linear-gradient(
              top, #7abcff 0%, #60abf8 44%, #4096ee 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(
              top, #7abcff 0%,#60abf8 44%,#4096ee 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(
              to bottom, #7abcff 0%,#60abf8 44%,#4096ee 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          }

          .p1 {
            color: #f2e13f;
          }

          .p2 {
            color: #7fd658;
          }

          .p1sel {
            background: #c8b357;
          }

          .p1move {
            background: #f2e13f;
          }

          .p2sel {
            background: #46af32;
          }

          .p2move {
            background: #7fd658;
          }
        `}</style>
      </button>
    )
  }
}

export default reactStamp(React).compose(
  Square
)
