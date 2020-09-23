import cn from 'classnames'
import React from 'react'
import CountUp from 'react-countup'

import { isDecimal, getDecimalsLength } from '../utils'

type Props = {
  highlight?: boolean
  title: string
  description: string
  growthRate: number
  className?: string
}

const DataStats: React.FC<Props> = ({
  highlight,
  title,
  description,
  growthRate,
  className,
}) => {
  const regexp = /([^\d]*)(-?(?:\d+)?\.?\d+)([^\d]*)/
  const [prefix, _number, suffix] = title
    ? (title.match(regexp) as []).slice(1)
    : ''
  const number = parseFloat(_number)
  return (
    <div className={className}>
      <h2
        className={cn('text-26 leading-none font-bold', {
          'text-red': highlight,
        })}
      >
        <CountUp
          duration={0}
          start={+number}
          end={+number}
          prefix={prefix}
          suffix={suffix}
          decimals={getDecimalsLength(number)}
          decimal={isDecimal(number) ? '.' : ' '}
          separator=","
        />
      </h2>
      <h3 className="mt-1 text-13 leading-none text-accents-9">
        {description}
      </h3>
      <p
        className={cn(
          'mt-3 text-11',
          growthRate > 0 ? 'text-green' : 'text-red'
        )}
      >
        {growthRate > 0
          ? `环比增长 ${growthRate}%`
          : `环比下降 ${Math.abs(growthRate)}%`}
      </p>
    </div>
  )
}

export default DataStats
