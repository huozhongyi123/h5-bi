import React, { useState } from 'react'
import { ChevronUp, ChevronDown, ChevronRight } from 'react-feather'

import IconCircle from './IconCircle'
import IconCheckCircle from './IconCheckCircle'

import Popover, { Vertical, Horizontal } from './Popover'

type Props = {
  className?: string
  orgList: Array<any>
}

const SubsitePicker: React.FC<Props> = ({ className, orgList }) => {
  const [open] = useState()

  return (
    <Popover
      className={className}
      overlay
      full
      anchorOrigin={{
        vertical: Vertical.Bottom,
        horizontal: Horizontal.Left,
      }}
      transformOrigin={{
        vertical: Vertical.Top,
        horizontal: Horizontal.Left,
      }}
      trigger={
        <div className="pl-8 pr-2 py-12 text-12 bg-white rounded flex items-center">
          广阳子站
          {open ? (
            <ChevronUp className="text-gray-600" size="18" />
          ) : (
            <ChevronDown className="text-gray-600" size="18" />
          )}
        </div>
      }
    >
      <div className="bg-white rounded-lg">
        <div className="px-25 py-20 flex">
          <div className="flex-1">
            <h3 className="font-bold">仓库</h3>
            <div className="mt-20 text-15">
              <p className="flex items-center text-primary">全部</p>
              {orgList.map((res, index) => {
                ;<p className="flex items-center" key={index}>
                  {res.name}
                  <ChevronRight className="ml-5" size="15" />
                </p>
              })}
              <p className="flex items-center">
                秦皇岛仓库
                <ChevronRight className="ml-5" size="15" />
              </p>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold">仓库</h3>
            <div className="mt-20 text-15">
              <p className="flex items-center text-primary">
                <IconCheckCircle className="mr-10" size="15" />
                全部
              </p>
              <p className="flex items-center">
                <IconCircle className="mr-10" size="15" />
                华北大区
              </p>
              <p className="flex items-center">
                <IconCircle className="mr-10" size="15" />
                华南大区
              </p>
              <p className="flex items-center">
                <IconCircle className="mr-10" size="15" />
                华东大区
              </p>
            </div>
          </div>
        </div>
        <div className="h-45 flex border-t border-gray-light text-center">
          <a className="flex-1 flex items-center justify-center text-accents-9">
            重置
          </a>
          <a className="flex-1 flex items-center justify-center border-l border-gray-light text-primary font-bold">
            完成
          </a>
        </div>
      </div>
    </Popover>
  )
}

export default SubsitePicker
