import React from 'react'
import { TotalType, OverviewData } from '../interface/DetailData'
import DataStats from '../components/DataStats'
import Divider from '../components/Divider'
import Chart, { ChartItem } from '../components/Chart'

type Props = {
  content: TotalType<OverviewData>
}

const OverviewDetail: React.FC<Props> = ({ content }) => {
  const { totalData, detailData } = content
  const {
    orderCount,
    orderCountSequential,
    finishOrderCount,
    finishOrderCountSequential,
    specificationsAmount,
    specificationsAmountSequential,
    finishSpecificationsAmount,
    finishGoodsAmountSequential,
    specificationsCount,
    specificationsCountSequential,
    finishSpecificationsCount,
    finishSpecificationsCountSequential,
  } = totalData
  let overviewChartData: Array<ChartItem> = []
  if (detailData) {
    for (const item of detailData) {
      const list = [
        { name: '总订单', district: item.orgName, value: item.orderCount },
        {
          name: '总金额',
          district: item.orgName,
          value: item.specificationsAmount,
        },
        {
          name: 'SPU',
          district: item.orgName,
          value: item.specificationsCount,
        },
      ]
      overviewChartData = [...overviewChartData, ...list]
    }
  }
  return (
    <div className="bg-white">
      <div className="mt-20 flex items-baseline">
        <DataStats
          className="pl-10 flex-1"
          title={String(orderCount)}
          description="配送总订单(个)"
          growthRate={orderCountSequential}
        />
        <Divider x={40} size={44} />
        <DataStats
          className="pl-10 flex-1"
          title={String(finishOrderCount)}
          description="已完成配送订单(个)"
          growthRate={finishOrderCountSequential}
        />
      </div>
      <div className="mt-20 flex items-baseline">
        <DataStats
          className="pl-10 flex-1"
          title={String(specificationsAmount)}
          description="配送总金额(元)"
          growthRate={specificationsAmountSequential}
        />
        <Divider x={40} size={44} />
        <DataStats
          className="pl-10 flex-1"
          title={String(finishSpecificationsAmount)}
          description="已完成配送金额(元)"
          growthRate={finishGoodsAmountSequential}
        />
      </div>
      <div className="mt-20 flex items-baseline">
        <DataStats
          className="pl-10 flex-1"
          title={String(specificationsCount)}
          description="配送总SPU(个)"
          growthRate={specificationsCountSequential}
        />
        <Divider x={40} size={44} />
        <DataStats
          className="pl-10 flex-1"
          title={String(finishSpecificationsCount)}
          description="已完成配送SPU(个)"
          growthRate={finishSpecificationsCountSequential}
        />
      </div>
      <div className="bg-white grid grid-cols-1 pb-30">
        <div className="bg-white rounded-md h-240">
          <Chart className="mt-25" data={overviewChartData} />
        </div>
      </div>
    </div>
  )
}

export default OverviewDetail
