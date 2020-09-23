import cn from 'classnames'
import React from 'react'

// @TODO {x, y} choose one
type Props = {
  x?: number
  y?: number
  size: number
  className?: string
}

const Divider: React.FC<Props> = ({ x = 0, y = 0, size, className }) => {
  return (
    <div className={cn('divider', className)}>
      <span className="bg-gary"></span>
      <style jsx>{`
        .divider {
          width: ${x}px;
          height: ${y}px;
          position: relative;
        }
        span {
          width: ${y ? size : 1}px;
          height: ${x ? size : 1}px;
          position: absolute;
          left: 50%;
          right: 50%;
          top: 50%;
          bottom: 50%;
        }
      `}</style>
    </div>
  )
}

export default Divider
