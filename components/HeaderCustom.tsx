import React from 'react'
import Router from 'next/router'
import { ChevronLeft } from 'react-feather'

interface IProps {
  title: string
}

const HeaderCustom: React.FunctionComponent<IProps> = ({ title }) => {
  const goBack = () => {
    Router.back()
  }

  return (
    <div className="px-15 py-15 text-base bg-white rel flex items-center justify-center relative">
      <ChevronLeft
        className="text-gray-600 absolute left-0"
        size="25"
        onClick={() => goBack()}
      />
      <div>{title}</div>
    </div>
  )
}

export default HeaderCustom
