import React from 'react'
import { TotalType, RoutesData } from '../interface/DetailData'
import { RoutesVehichle, RoutesBoard } from '../interface/PartnerVehichleData'
import DataStats from '../components/DataStats'
import Tabs from '../components/Tabs'
import Chart, { ChartItem } from '../components/Chart'
import useSWR from 'swr'
import Divider from '../components/Divider'
import postfetch from '../utils/fetcher'
import { filterDate, filterDistance } from '../utils'
import { Scope } from '../constants'

interface TabItem {
  text: string
  active: boolean
}

type Props = {
  content: TotalType<RoutesData>
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

const RoutesDetail: React.FC<Props> = ({
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
    finishLineCount,
    finishLinePercent,
    totalLineCount,
    totalLineSequential,
    finishLineSequential,
    finishLinePercentSequential,
  } = totalData
  const [buttomList, setButtomList] = React.useState<Array<TabItem>>([
    {
      text: '14:00前未完成',
      active: true,
    },
    {
      text: '16:00前未完成',
      active: false,
    },
  ])
  const [routesDetailData, setRoutesDetailData] = React.useState<
    Array<RoutesVehichle>
  >([])
  let routerdata: RoutesBoard | undefined
  const { data } = useSWR<RoutesBoard>(
    scope === 'warehouse'
      ? [
          '/data-board/later-driver-line-info',
          startTime,
          endTime,
          arrRegion,
          arrWarehouse,
          isServiceStation,
        ]
      : null,
    fetcher,
    { revalidateOnFocus: false }
  )
  routerdata = data

  // computed routes chart data
  let routesChartData: ChartItem[] = []
  if (detailData) {
    for (const item of detailData) {
      const list = [
        { name: '已完成', district: item.orgName, value: item.finishLineCount },
        { name: '未完成', district: item.orgName, value: item.noFinishCount },
      ]
      routesChartData = [...routesChartData, ...list]
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
        if (routerdata != undefined)
          setRoutesDetailData(filterRouteData(routerdata.fourteenNoFinishList))
        break
      case 1:
        if (routerdata != undefined)
          setRoutesDetailData(filterRouteData(routerdata.sixteenNoFinishList))
        break
    }
    setButtomList([...arr])
  }

  const filterRouteData = (item: Array<RoutesVehichle>) => {
    let list = item
    if (isServiceStation == 0) {
      list = list.filter((res) => res.isServiceStation == 0)
    } else if (isServiceStation == 1) {
      list = list.filter((res) => res.isServiceStation == 1)
    }
    return list
  }

  React.useEffect(() => {
    switchTabButton(0)
    if (routerdata) {
      setRoutesDetailData(filterRouteData(routerdata.fourteenNoFinishList))
    }
  }, [routerdata])
  return (
    <div>
      <div className="mt-20 flex items-baseline">
        <DataStats
          className="pl-10 flex-1"
          title={String(totalLineCount)}
          description="总线路(条)"
          growthRate={totalLineSequential}
        />
        <Divider x={20} size={44} />
        <DataStats
          className="pl-10 flex-1"
          title={String(finishLineCount)}
          description="已完成线路(条)"
          growthRate={finishLineSequential}
        />
        <Divider x={20} size={44} />
        <DataStats
          className="pl-10 flex-1"
          title={String(finishLinePercent) + '%'}
          description="完成比例"
          growthRate={finishLinePercentSequential}
        />
      </div>
      <div className="bg-white grid grid-cols-1 pb-30">
        <div className="bg-white rounded-md h-240">
          <Chart data={routesChartData} className="mt-25" />
        </div>
      </div>
      {detailData.length > 0 && (
        <>
          <div className="px-30 bg-white">
            <Tabs
              buttomList={buttomList}
              switchTabButton={switchTabButton}
            ></Tabs>
          </div>
          <div className="px-10 bg-white">
            <div className="bg-white py-10">
              {scope !== 'warehouse' ? (
                detailData.map((res, index) => (
                  <div
                    className="flex items-center justify-between py-10"
                    key={index}
                  >
                    <div className="h-20 text-14">{res.orgName}</div>
                    <div className="flex flex-col items-end">
                      <div className="h-20 text-14">
                        未完成线路：
                        <span className="text-primary-dark">
                          {buttomList[0].active
                            ? res.fourteenNoFinishLineCount
                            : res.sixteenNoFinishLineCount}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white py-10">
                  {routesDetailData.map((res, index) => (
                    <div
                      className="flex items-center justify-between py-10"
                      key={index}
                    >
                      <div>
                        <div className="h-20 text-14">{res.orgName}</div>
                        <div className="h-18 text-13 mt-5 text-accents-6">{`${res.driver} ${res.driverMobile}`}</div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="h-20 text-14">
                          发车时间：{filterDate(res.dispatchTime) || '未发车'}
                        </div>
                        <div className="h-18 text-13 mt-5 text-accents-6">
                          预计里程：{filterDistance(res.expectTotalMileage)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default RoutesDetail
