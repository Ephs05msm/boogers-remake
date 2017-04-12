import React from 'react'
import reactStamp from 'react-stamp'

import TitleLetter from './titleLetter'

const BoogersTitle = {
  displayName: 'Title',

  render () {
    return (
      <div className='title'>
        <TitleLetter letter='B' color='#dee978' rotation='-20' />
        <span>
          <svg className='booger-frame'>
            <circle cx='15' cy='15' r='15' fill='#d84ddc'/>
          </svg>
        </span>
        <span>
          <svg className='booger-frame'>
            <circle cx='15' cy='15' r='15' fill='#dd6b64'/>
          </svg>
        </span>
        <TitleLetter letter='G' color='#4fcb5e' rotation='-20' />
        <TitleLetter letter='E' color='#22c0ae' rotation='10' />
        <TitleLetter letter='R' color='#dea25d' rotation='20' />
        <TitleLetter letter='S' color='#ba725f' rotation='-10' />
        <style jsx>{`
          span {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin: 2px;
          }
          .booger-frame {
            height: 30px;
            width: 30px;
          }

          .title {
            display: flex;
            justify-content: center;
            grid-area: header;
          }
        `}</style>
      </div>
    )
  }
}

export default reactStamp(React).compose(
  BoogersTitle
)