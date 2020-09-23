import React from 'react'
import { Vehichle } from '../interface/PartnerVehichleData'
interface Props {
  detailData: Array<Vehichle>
  isAbnormal: boolean
}
const TabListContent: React.FC<Props> = ({ detailData, isAbnormal }) => {
  return (
    <div className="bg-white py-15">
      {!isAbnormal && (
        <div className="text-12 text-primary">距离大于1km的交接</div>
      )}
      {detailData.map((res, index) => (
        <div className="pt-10 border-b border-gary" key={index}>
          <div className="mb-10">
            <div className="h-20 text-14">团长：{res.partnerName}</div>
            <div className="leading-20 text-13 mt-5 text-accents-6">
              {res.residentialAddress}
            </div>
          </div>
          <div className="mb-10">
            <div className="h-20 text-14">司机：{res.driver}</div>
            <div className="h-18 text-13 mt-5 text-accents-6">{res.mobile}</div>
          </div>
          {isAbnormal && (
            <div className="mb-15">
              <div className="leading-20 text-14">
                <span>异常原因：</span>
                <span className="text-red">{res.exceptionRemark}</span>
              </div>
            </div>
          )}
          <div className="mb-15">
            <div className="h-20 text-14">交接时间：{res.handoverTime}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TabListContent
