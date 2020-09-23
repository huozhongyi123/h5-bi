import React from 'react'
import { TotalType, CarsData } from '../interface/DetailData'
import { VehichleBoard, CarsVehichle } from '../interface/PartnerVehichleData'
import DataStats from '../components/DataStats'
import Tabs from '../components/Tabs'
import Chart, { ChartItem } from '../components/Chart'
import useSWR from 'swr'
import postfetch from '../utils/fetcher'
import Divider from '../components/Divider'
import { filterDate, filterDistance, filterBasic } from '../utils'
import { Scope } from '../constants'

interface TabItem {
  text: string
  active: boolean
}

type Props = {
  content: TotalType<CarsData>
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

const CarsDetail: React.FC<Props> = ({
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
    avgLoadCount,
    loadCountSequential,
    avgMile,
    mileSequential,
    avgCount,
    specificationsCountSequential,
    avgAmount,
    specificationsAmountSequential,
    loadRateSequential,
    avgLoadRate,
  } = totalData

  const [buttomList, setButtomList] = React.useState<Array<TabItem>>([
    {
      text: '最早发车时间',
      active: true,
    },
    {
      text: '最晚发车时间',
      active: false,
    },
  ])
  let cardata: VehichleBoard | undefined
  const { data } = useSWR<VehichleBoard>(
    scope === 'warehouse'
      ? [
          '/data-board/vehicle-data-board-sort',
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
  cardata = data

  let carsChartData: ChartItem[] = []
  if (detailData) {
    for (const item of detailData) {
      const list = [
        {
          name: '单车平均装载件数',
          district: item.orgName,
          value: item.specificationsCount,
        },
        {
          name: '单车平均装载金额',
          district: item.orgName,
          value: item.specificationsAmount,
        },
      ]
      carsChartData = [...carsChartData, ...list]
    }
  }

  const [carDetailkData, setCarDetailkData] = React.useState<
    Array<CarsVehichle>
  >([])
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
        if (cardata != undefined) setCarDetailkData(cardata.earlyDriverList)
        break
      case 1:
        if (cardata != undefined) setCarDetailkData(cardata.lateDriverList)
        break
    }
    setButtomList([...arr])
  }

  React.useEffect(() => {
    switchTabButton(0)
    if (cardata != undefined) setCarDetailkData(cardata.earlyDriverList)
  }, [cardata])
  return (
    <div className="bg-white">
      <div className="mt-20 flex items-baseline">
        <DataStats
          className="pl-10 flex-1"
          title={String(avgLoadCount)}
          description="单车平均装载点位(个)"
          growthRate={loadCountSequential}
        />
        <Divider x={40} size={44} />
        <DataStats
          className="pl-10 flex-1"
          title={`${filterDistance(avgMile)}`}
          description="平均线路行驶里程"
          growthRate={mileSequential}
        />
      </div>
      <div className="mt-20 flex items-baseline">
        <DataStats
          className="pl-10 flex-1"
          title={String(avgCount)}
          description="单车平均装载商品(件)"
          growthRate={specificationsCountSequential}
        />
        <Divider x={40} size={44} />
        <DataStats
          className="pl-10 flex-1"
          title={String(filterBasic(avgAmount))}
          description="单车平均装载金额(元)"
          growthRate={specificationsAmountSequential}
        />
      </div>
      <div className="mt-20 flex items-baseline">
        <DataStats
          className="pl-10 flex-1"
          title={String(filterBasic(avgLoadRate) + '%')}
          description="单车平均满载率"
          growthRate={loadRateSequential}
        />
        <div className="w-1 h-40 mt-10 bg-gary mx-25"></div>
      </div>
      <div className="bg-white grid grid-cols-1 pb-30">
        <div className="bg-white rounded-md h-240">
          <Chart className="mt-25" data={carsChartData} />
        </div>
      </div>
      {carDetailkData && (
        <>
          <div className="px-30 bg-white">
            <Tabs
              buttomList={buttomList}
              switchTabButton={switchTabButton}
            ></Tabs>
          </div>
          <div className="px-10 bg-white">
            <div className="bg-white py-10">
              {scope !== 'warehouse'
                ? detailData.map((res, index) => (
                  ((buttomList[0].active && res.earliestTime) || (buttomList[1].active && res.latestTime)) &&
                    <div
                      className="flex items-center justify-between py-10"
                      key={index}
                    >
                      <div className="h-20 text-14">
                        {res ? res.orgName : ''}
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="h-20 text-14">
                          发车时间：
                          {res
                            ? buttomList[0].active
                              ? filterDate(res.earliestTime)
                              : filterDate(res.latestTime)
                            : ''}
                        </div>
                      </div>
                    </div>
                  ))
                : carDetailkData.map((res, index) => (
                    <div
                      className="flex items-center justify-between py-10"
                      key={index}
                    >
                      <div>
                        <div className="h-20 text-14">
                          {res ? res.driver : ''}
                        </div>
                        <div className="h-18 text-13 mt-5 text-accents-6">
                          {res.driverMobile}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="h-20 text-14">
                          发车时间：{res ? filterDate(res.dispatchTime) : ''}
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CarsDetail
