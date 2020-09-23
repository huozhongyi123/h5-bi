import cn from 'classnames'
import React from 'react'
import Link from 'next/link'
import { ParsedUrlQueryInput } from 'querystring'

interface LinkType {
  pathname: string
  query: string | ParsedUrlQueryInput | null | undefined
}

type Props = {
  title: string
  link: LinkType
  className?: string
}

const Card: React.FC<Props> = ({ children, title, link, className }) => {
  return (
    <div className={cn('p-15 pb-30 bg-white rounded-lg', className)}>
      <div className="flex items-center justify-between">
        <p className="font-medium">{title}</p>
        <Link href={link}>
          <a className="text-12 text-primary-dark">查看更多</a>
        </Link>
      </div>
      {children}
    </div>
  )
}

export default Card
