import React from 'react'
import reactStamp from 'react-stamp'

import Booger from './booger'

const BoogerFrame = {
  displayName: 'BoogerFrame',

  render () {
    const { value } = this.props

    if (value) {    
      return (
        <svg
          className='booger-frame'
        >
          <Booger value={value}/>
          <style jsx>{`
            @media (min-width: 430px) {
              .booger-frame {
                height: 40px;
                width: 40px;
              }
            }

            @media (max-width: 429px) {
              .booger-frame {
                height: 25px;
                width: 25px;
              }
            }
          `}</style>
        </svg>
      )
    } else {
      return null
    }
  }
}

export default reactStamp(React).compose(
  BoogerFrame
)