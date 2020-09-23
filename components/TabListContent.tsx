import React from 'react'
import { Vehichle } from '../interface/PartnerVehichleData'

interface Props {
  detailData: Array<Vehichle>
}
const TabListContent: React.FC<Props> = ({ detailData }) => {
  return (
    <div className="bg-white py-10">
      {detailData.map((res, index) => (
        <div className="flex items-center justify-between py-10" key={index}>
          <div>
            <div className="h-20 text-14 font-bold">{res.driver}</div>
            <div className="h-18 text-13 mt-5 text-accents-6">{res.mobile}</div>
          </div>
          <div className="flex flex-col items-end">
            <div className="h-20 text-14 font-bold">
              未完成：
              <span className="text-primary-dark">
                {res.unFinishResidentialCount}
              </span>
            </div>
            <div className="h-18 text-13 mt-5 text-accents-6">
              已完成：{res.finishResidentialCount}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TabListContent
