import React from 'react'
import { TotalType, GroupPointsData } from '../interface/DetailData'
import { PartnerVehichle, Vehichle } from '../interface/PartnerVehichleData'
import TabListContent from '../components/TabListContent'
import DataStats from '../components/DataStats'
import SwitchList from '../components/SwitchList'
import Divider from '../components/Divider'
import Tabs from '../components/Tabs'
import Chart, { ChartItem } from '../components/Chart'
import useSWR from 'swr'
import postfetch from '../utils/fetcher'
import { filterBasic } from '../utils'
import { Scope } from '../constants'

interface TabItem {
  text: string
  active: boolean
}

type Props = {
  content: TotalType<GroupPointsData>
  startTime: string
  endTime: string
  arrRegion: any
  arrWarehouse: any
  isServiceStation?: number | null
  scope?: Scope
}

interface FetchData {
  deliveryStartTime: string
  deliveryEndTime: string
  isServiceStation?: number | undefined | null
  areaId?: string[] | Array<number>
  warehouseIdList?: string[] | Array<number>
}

const fetcher = function (
  url: string,
  deliveryStartTime: string,
  deliveryEndTime: string,
  arrRegion: number[] | Array<number> | string,
  arrWarehouse: string | Array<number>,
  isServiceStation?: number | null
) {
  let data: FetchData = {
    deliveryStartTime: deliveryStartTime.replace(/\./g, '-'),
    deliveryEndTime: deliveryEndTime.replace(/\./g, '-'),
  }
  if (isServiceStation != -1) {
    data.isServiceStation = isServiceStation
  }
  if (arrRegion != '') {
    data.areaId = arrRegion instanceof Array ? arrRegion : [arrRegion]
  }
  if (arrWarehouse != '') {
    data.warehouseIdList =
      arrWarehouse instanceof Array ? arrWarehouse : [arrWarehouse]
  }

  return postfetch(url, { body: JSON.stringify(data) })
}

const GroupPointDetail: React.FC<Props> = ({
  content,
  startTime,
  endTime,
  arrRegion,
  arrWarehouse,
  isServiceStation,
  scope = 'warehouse',
}) => {
  const { totalData, detailData } = content
  const {
    residentialCount,
    residentialCountSequential,
    finishResidentialCount,
    finishResidentialCountSequential,
    finishResidentialRate,
    finishResidentialRateSequential,
    avgSpecificationsCount,
    avgSpecificationsCountSequential,
    avgSpecificationsAmount,
    avgSpecificationsAmountSequential,
    distanceFarPointCount,
    distanceFarPointCountSequential,
    exceptionPointCount,
    exceptionPointCountSequential,
  } = totalData
  const [buttomList, setButtomList] = React.useState<Array<TabItem>>([
    {
      text: '未完成',
      active: true,
    },
    {
      text: '超距离交接',
      active: false,
    },
    {
      text: '异常标记',
      active: false,
    },
  ])
  const [routesDetailData, setRoutesDetailData] = React.useState<
    Array<Vehichle>
  >([])

  const { data } = useSWR<PartnerVehichle>(
    [
      '/data-board/partner-detail-vehicle',
      startTime,
      endTime,
      arrRegion,
      arrWarehouse,
      isServiceStation,
    ],
    fetcher,
    { revalidateOnFocus: false }
  )
  // computed group points chart data
  let groupPointsChartData: ChartItem[] = []
  if (detailData) {
    for (const item of detailData) {
      const list = [
        {
          name: '已完成团点',
          district: item.orgName,
          value: item.finishResidentialCount,
        },
        {
          name: '未完成团点',
          district: item.orgName,
          value: item.unFinishResidentialCount,
        },
      ]
      groupPointsChartData = [...groupPointsChartData, ...list]
    }
  }

  const switchTabButton = (num: number) => {
    let arr = buttomList
    arr.map((res, index) => {
      if (num == index) {
        res.active = true
      } else {
        res.active = false
      }
    })
    switch (num) {
      case 0:
        if (data != undefined) setRoutesDetailData(data.unFinishList)
        break
      case 1:
        if (data != undefined) setRoutesDetailData(data.distanceFarPortList)
        break
      case 2:
        if (data != undefined) setRoutesDetailData(data.exceptionList)
        break
    }
    setButtomList([...arr])
  }

  React.useEffect(() => {
    switchTabButton(0)
    if (data != undefined) setRoutesDetailData(data.unFinishList)
  }, [data])

  return (
    <div className="bg-white">
      <div className="mt-20 pt-20 flex items-baseline">
        <DataStats
          className="pl-10 flex-1"
          title={String(residentialCount)}
          description="总团点(个)"
          growthRate={residentialCountSequential}
        />
        <Divider x={20} size={44} />
        <DataStats
          className="pl-10 flex-1"
          title={String(finishResidentialCount)}
          description="已完成团点(个)"
          growthRate={finishResidentialCountSequential}
        />
        <Divider x={20} size={44} />
        <DataStats
          className="pl-10 flex-1"
          title={String(finishResidentialRate) + '%'}
          description="完成比例"
          growthRate={finishResidentialRateSequential}
        />
      </div>
      <div className="mt-20 flex items-baseline">
        <DataStats
          className="pl-10 flex-1"
          title={String(avgSpecificationsCount)}
          description="平均团点商品(件)"
          growthRate={avgSpecificationsCountSequential}
        />
        <Divider x={40} size={44} />
        <DataStats
          className="pl-10 flex-1"
          title={String(filterBasic(avgSpecificationsAmount))}
          description="平均团点金额(元)"
          growthRate={avgSpecificationsAmountSequential}
        />
      </div>
      <div className="mt-20 flex items-baseline">
        <DataStats
          highlight
          className="pl-10 flex-1"
          title={String(distanceFarPointCount)}
          description="超规定距离交接(个)"
          growthRate={distanceFarPointCountSequential}
        />
        <Divider x={40} size={44} />
        <DataStats
          highlight
          className="pl-10 flex-1"
          title={String(exceptionPointCount)}
          description="异常标记点位(个)"
          growthRate={exceptionPointCountSequential}
        />
      </div>
      <div className="bg-white grid grid-cols-1 pb-30">
        <div className="bg-white rounded-md h-240">
          <Chart className="mt-25" data={groupPointsChartData} />
        </div>
      </div>
      {detailData && scope == 'warehouse' && (
        <>
          <div className="px-30 bg-white">
            <Tabs
              buttomList={buttomList}
              switchTabButton={switchTabButton}
            ></Tabs>
          </div>
          <div className="px-10 bg-white">
            {buttomList.map((res, index) =>
              index == 0
                ? res.active && (
                    <TabListContent
                      detailData={routesDetailData}
                      key={index}
                    ></TabListContent>
                  )
                : res.active && (
                    <SwitchList
                      detailData={routesDetailData}
                      isAbnormal={index == 2 ? true : false}
                      key={index}
                    ></SwitchList>
                  )
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default GroupPointDetail
