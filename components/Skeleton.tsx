import React from 'react'
import cn from 'classnames'

interface IProps {
  className?: string
  width?: number
  height?: number
  boxHeight?: number
  rounded?: boolean
  squared?: boolean
}

const Skeleton: React.FunctionComponent<IProps> = ({
  className,
  width = 24,
  height = 24,
  boxHeight = 24,
  rounded = false,
  squared = false,
}) => {
  return (
    <span
      className={cn(
        className,
        `skeleton block`,
        squared ? '' : rounded ? 'rounded-full' : 'rounded'
      )}
    >
      <style jsx>{`
        .skeleton {
          width: ${width}px;
          min-height: ${height}px;
          margin-bottom: calc(${boxHeight - 24}px);
          background-size: 400% 100%;
          background-image: linear-gradient(
            270deg,
            #fafafa,
            #eaeaea,
            #eaeaea,
            #fafafa
          );
          animation: loading 8s ease-in-out infinite;
        }
        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          to {
            background-position: -200% 0;
          }
        }
      `}</style>
    </span>
  )
}

export default Skeleton
