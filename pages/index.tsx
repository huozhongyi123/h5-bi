import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import useSWR from 'swr'
import { format } from 'date-fns'

import DatePicker from '../components/DatePicker'
import WarehousePicker from '../components/WarehousePicker'
import Card from '../components/Card'
import DataStats from '../components/DataStats'
import Divider from '../components/Divider'
import RoutesDetailPage from '../components/RoutesDetail'
import CarsDetailPage from '../components/CarsDetail'
import Chart, { ChartItem } from '../components/Chart'
import TabBar from '../components/TabBar'
import Skeleton from '../components/Skeleton'
import Message from '../components/Message'
import fetcher from '../utils/fetcher'
import { filterBasic } from '../utils'
import { Scope, TabBarItems, TabBarItem } from '../constants'

import { RegionType, WholeCountry } from '../interface/WarePicker'
import { OverviewResponse } from '../interface/OverviewResponse'
import { RoutesRepsone } from '../interface/RoutesResponse'
import { GroupPointsResponse } from '../interface/GroupPointsResponse'
import { CarsResponse } from '../interface/CarsResponse'
import { useRouter } from 'next/router'

const cardPanelFetcher = (
  url: string,
  areaId: string,
  warehouseIdList: string,
  deliveryStartTime: string,
  deliveryEndTime: string,
  scope: Scope
) => {
  const body = {
    areaId: areaId.split(','),
    deliveryStartTime,
    deliveryEndTime,
    warehouseIdList: warehouseIdList.split(','),
  }
  if (scope === 'global' || !areaId) {
    delete body.areaId
  }
  if (scope === 'global' || scope === 'region' || !warehouseIdList) {
    delete body.warehouseIdList
  }
  return fetcher(url, {
    body: JSON.stringify(body),
  })
}

const Home: NextPage = () => {
  const router = useRouter()
  // redirect authority scope
  useEffect(() => {
    if (!router.asPath.includes('scope=')) {
      // fetch authority from sessionStorage
      let _authority: Scope = 'global'
      if (typeof window !== 'undefined') {
        const { wh_areas, wh_warehouse } =
          JSON.parse(sessionStorage.getItem('userInfo') || '{}').content || {}
        if (wh_warehouse) {
          _authority = 'warehouse'
        } else if (wh_areas) {
          _authority = 'region'
        }
        // setAuthority(_authority)
        router.push(`/?scope=${_authority}`)
      }
    }
  }, [])

  const scope = (router.query.scope || 'global') as Scope
  // set TabBar active
  for (const item of TabBarItems) {
    if (item.name === scope) {
      item.active = true
    } else {
      item.active = false
    }
  }

  // authority
  // const [authority, setAuthority] = useState<Scope>('global')
  // Set default date picker start & end
  const today = format(new Date(), 'yyyy-MM-dd')
  const start = format(new Date(), 'yyyy-MM-dd')
  const [startTime, setStartTime] = useState<string>(start)
  const [endTime, setEndTime] = useState<string>(today)
  const [regionIds, setRegionIds] = useState<string>()
  const [warehouseIds, setWarehouseIds] = useState<string>()
  const [changeData, setChangeDate] = useState<boolean>(false)
  // Some state for WarehousePicker
  const [region, setRegion] = useState<Array<RegionType>>([])
  const [warehouse, setWarehouse] = useState<Array<RegionType>>([])
  const [arrRegion, setArrRegion] = useState<Array<string>>([])
  const [arrWarehouse, setArrWarehouse] = useState<Array<string>>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [messageShow, setMessageShow] = useState<number>(0)
  const [authority, setAuthority] = useState<string>('globle')

  // fetch warehouse data
  let { data: orgList } = useSWR<WholeCountry[]>(
    '/data-board/user-organization'
  )
  useEffect(() => {
    if (!orgList) return
    const _regionIds: string[] = []
    const _warehouseIds: string[] = []
    if (!orgList[0].orgId) {
      orgList = orgList[0].childList as WholeCountry[]
    }
    for (let i = 0; i < orgList.length; i++) {
      const region = orgList[i]
      _regionIds.push(region.orgId)
      for (let j = 0; j < region.childList.length; j++) {
        const warehouse = region.childList[j]
        _warehouseIds.push(warehouse.orgId)
      }
    }
    setRegionIds(_regionIds.join(','))
    setWarehouseIds(_warehouseIds.join(','))
  }, [orgList])

  // fetch overview
  const { data: overviewData } = useSWR<OverviewResponse>(
    () =>
      regionIds || warehouseIds
        ? [
            '/data-board/overview',
            regionIds,
            warehouseIds,
            startTime,
            endTime,
            scope,
          ]
        : null,
    cardPanelFetcher
  )
  // computed overivew chart data
  let overviewChartData: ChartItem[] = []
  if (overviewData) {
    for (const item of overviewData.detailData) {
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

  // fetch routes
  const { data: routesData } = useSWR<RoutesRepsone>(
    () =>
      regionIds || warehouseIds
        ? [
            '/data-board/line',
            regionIds,
            warehouseIds,
            startTime,
            endTime,
            scope,
          ]
        : null,
    cardPanelFetcher
  )

  // fetch group points
  const { data: groupPointsData } = useSWR<GroupPointsResponse>(
    () =>
      regionIds || warehouseIds
        ? [
            '/data-board/partner-info',
            regionIds,
            warehouseIds,
            startTime,
            endTime,
            scope,
          ]
        : null,
    cardPanelFetcher
  )
  // computed group points chart data
  let groupPointsChartData: ChartItem[] = []
  if (groupPointsData) {
    for (const item of groupPointsData.detailData) {
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

  // fetch cars
  const { data: carsData } = useSWR<CarsResponse>(
    () =>
      regionIds || warehouseIds
        ? [
            '/data-board/vehicle-data-board',
            regionIds,
            warehouseIds,
            startTime,
            endTime,
            scope,
          ]
        : null,
    cardPanelFetcher
  )

  function onChangeTabBar(item: TabBarItem) {
    // changeOrgList()
    // if (TabBarItems[index].name == 'region') {
    //   const regions = region
    //     .splice(1)
    //     .filter((item) => item.active)
    //     .map((item) => item.orgId)
    //   setRegionIds(regions.join(','))
    //   setWarehouseIds('')
    // } else if (TabBarItems[index].name == 'warehouse') {
    //   const regions = region
    //     .splice(1)
    //     .filter((item) => item.active)
    //     .map((item) => item.orgId)
    //   setRegionIds(regions.join(','))
    //   const warehouses = warehouse
    //     .splice(1)
    //     .filter((item) => item.active)
    //     .map((item) => item.orgId)
    //   setWarehouseIds(warehouses.join(','))
    // } else {
    //   setRegionIds('')
    //   setWarehouseIds('')
    // }
    router.replace(`/?scope=${item.name}`)
  }
  // DatePicker onChange handler
  function onChangeDatePicker(start: string, end: string) {
    setStartTime(start)
    setEndTime(end)
  }

  function onChangeWarehousePicker(
    regionIds: string[],
    warehouseIds: string[]
  ) {
    setRegionIds(regionIds.join(','))
    setWarehouseIds(warehouseIds.join(','))
  }

  const getWarehouse = (
    getregion: Array<RegionType>,
    getwarehouse: Array<RegionType>
  ) => {
    setRegion(getregion)
    setWarehouse(getwarehouse)
    let arr: Array<string> = [],
      arrChild: Array<string> = []
    getregion.map((res: RegionType) => {
      if (res.active) arr.push(res.orgId)
    })
    getwarehouse.map((res) => {
      if (res.active) arrChild.push(res.orgId)
    })
    setArrRegion(arr)
    setArrWarehouse(arrChild)
  }

  const onMessage = (title: string) => {
    changeOrgList()
    const date = new Date()
    if (title != '') {
      setMessageShow(date.getTime())
    }
    setErrorMessage(title)
  }

  const changeOrgList = () => {
    let regionArray: Array<any> = []
    let warehouseArray: Array<RegionType> = []
    let arrRegionDefault: Array<string> = []
    let arrWarehouseDefault: Array<string> = []
    if (orgList) {
      regionArray = orgList
      regionArray.map((item) => {
        item.active = true
        if (item.orgId != '0') arrRegionDefault.push(item.orgId)
        item.childList.map((res: RegionType) => {
          res.active = true
          if (res.orgId != '0') arrWarehouseDefault.push(res.orgId)
        })
        warehouseArray = [...warehouseArray, ...item.childList]
      })
      setChangeDate(true)
    }
    setRegion([...regionArray])
    setWarehouse([...warehouseArray])
    setArrRegion([...arrRegionDefault])
    setArrWarehouse([...arrWarehouseDefault])
  }

  useEffect(() => {
    // add default data
    if (changeData) return
    let _authority: Scope = 'global'
    if (typeof window !== 'undefined') {
      const { wh_areas, wh_warehouse } =
        JSON.parse(sessionStorage.getItem('userInfo') || '{}').content || {}
      if (wh_warehouse) {
        _authority = 'warehouse'
      } else if (wh_areas) {
        _authority = 'region'
      }
      setAuthority(_authority)
      changeOrgList()
    }
  }, [orgList])

  return (
    <div>
      <Head>
        <title>数据配送</title>
      </Head>
      <Message title={errorMessage} show={messageShow}></Message>
      <div id="searchBar">
        <div className="px-10 py-15 w-full flex flex-wrap fixed top-0 bg-gray-bg z-40">
          <DatePicker
            startTime={format(
              new Date(startTime.replace(/\-/g, '/')),
              'yyyy-MM-dd'
            )}
            endTime={format(
              new Date(endTime.replace(/\-/g, '/')),
              'yyyy-MM-dd'
            )}
            onChange={onChangeDatePicker}
          />

          <WarehousePicker
            scope={scope}
            orgList={
              region.length > 0
                ? region
                : orgList
                ? authority != 'global'
                  ? orgList
                  : orgList[0].childList
                : []
            }
            getWarehouse={getWarehouse}
            warehouse={warehouse}
            onChange={onChangeWarehousePicker}
            onMessage={onMessage}
            className="ml-10"
          />
        </div>
        <div className="h-75 w-full"></div>
      </div>

      {overviewData ? (
        <Card
          title="概览"
          link={{
            pathname: '/detail',
            query: {
              path: 'overview',
              startTime,
              endTime,
              arrRegion: regionIds?.split(','),
              arrWarehouse: warehouseIds?.split(','),
              scope,
            },
          }}
        >
          <div className="py-17 flex items-baseline">
            <DataStats
              className="pl-10 flex-1"
              title={overviewData.totalData.orderCount.toString()}
              description="配送总订单(个)"
              growthRate={overviewData.totalData.orderCountSequential}
            />
            <Divider x={40} size={44} />
            <DataStats
              className="flex-1"
              title={overviewData.totalData.finishOrderCount.toString()}
              description="已完成配送订单(个)"
              growthRate={overviewData.totalData.finishOrderCountSequential}
            />
          </div>
          <div className="py-17 flex items-baseline">
            <DataStats
              className="pl-10 flex-1"
              title={overviewData.totalData.specificationsAmount.toString()}
              description="配送总金额(元)"
              growthRate={overviewData.totalData.specificationsAmountSequential}
            />
            <Divider x={40} size={44} />
            <DataStats
              className="flex-1"
              title={overviewData.totalData.finishSpecificationsAmount.toString()}
              description="已完成配送金额(元)"
              growthRate={overviewData.totalData.finishGoodsAmountSequential}
            />
          </div>
          <div className="py-17 flex items-baseline">
            <DataStats
              className="pl-10 flex-1"
              title={overviewData.totalData.specificationsCount.toString()}
              description="配送总SPU(个)"
              growthRate={overviewData.totalData.specificationsCountSequential}
            />
            <Divider x={40} size={44} />
            <DataStats
              className="flex-1"
              title={overviewData.totalData.finishSpecificationsCount.toString()}
              description="已完成配送SPU(个)"
              growthRate={
                overviewData.totalData.finishSpecificationsCountSequential
              }
            />
          </div>
          <Chart className="mt-25" data={overviewChartData} />
        </Card>
      ) : (
        <div className="px-15">
          <Skeleton className="w-full" height={1000} />
        </div>
      )}

      {routesData && (
        <Card
          className="mt-10"
          title="线路"
          link={{
            pathname: '/detail',
            query: {
              path: 'routes',
              startTime,
              endTime,
              arrRegion: regionIds?.split(','),
              arrWarehouse: warehouseIds?.split(','),
              scope,
            },
          }}
        >
          <RoutesDetailPage
            content={routesData}
            startTime={startTime}
            endTime={endTime}
            arrRegion={regionIds?.split(',')}
            arrWarehouse={warehouseIds?.split(',')}
            isServiceStation={-1}
            scope={scope}
          />
        </Card>
      )}

      {groupPointsData && (
        <Card
          className="mt-15"
          title="团点"
          link={{
            pathname: '/detail',
            query: {
              path: 'groupPoints',
              startTime,
              endTime,
              arrRegion: regionIds?.split(','),
              arrWarehouse: warehouseIds?.split(','),
              scope,
            },
          }}
        >
          <div className="mt-17 flex items-baseline">
            <DataStats
              className="pl-10 flex-1"
              title={groupPointsData.totalData.residentialCount.toString()}
              description="总团点(个)"
              growthRate={groupPointsData.totalData.residentialCountSequential}
            />
            <Divider x={20} size={44} />
            <DataStats
              className="pl-10"
              title={groupPointsData.totalData.finishResidentialCount.toString()}
              description="已完成团点(个)"
              growthRate={
                groupPointsData.totalData.finishResidentialCountSequential
              }
            />
            <Divider x={20} size={44} />
            <DataStats
              className="pl-10 flex-1"
              title={`${groupPointsData.totalData.finishResidentialRate.toString()}%`}
              description="完成比例"
              growthRate={
                groupPointsData.totalData.finishResidentialRateSequential
              }
            />
          </div>
          <div className="mt-17 flex items-baseline">
            <DataStats
              className="pl-10 flex-1"
              title={groupPointsData.totalData.avgSpecificationsCount.toString()}
              description="平均团点商品(件)"
              growthRate={
                groupPointsData.totalData.avgSpecificationsCountSequential
              }
            />
            <Divider x={40} size={44} />
            <DataStats
              className="flex-1"
              title={filterBasic(
                groupPointsData.totalData.avgSpecificationsAmount
              ).toString()}
              description="平均团点金额(元)"
              growthRate={
                groupPointsData.totalData.avgSpecificationsAmountSequential
              }
            />
          </div>
          <div className="mt-17 flex items-baseline">
            <DataStats
              highlight
              className="pl-10 flex-1"
              title={groupPointsData.totalData.distanceFarPointCount.toString()}
              description="超规定距离交接(个)"
              growthRate={
                groupPointsData.totalData.distanceFarPointCountSequential
              }
            />
            <Divider x={40} size={44} />
            <DataStats
              highlight
              className="flex-1"
              title={groupPointsData.totalData.exceptionPointCount.toString()}
              description="异常标记点位(个)"
              growthRate={
                groupPointsData.totalData.exceptionPointCountSequential
              }
            />
          </div>
          <Chart className="mt-25" data={groupPointsChartData} />
        </Card>
      )}

      {carsData && (
        <Card
          className="mt-15"
          title="车辆"
          link={{
            pathname: '/detail',
            query: {
              path: 'cars',
              startTime,
              endTime,
              arrRegion: regionIds?.split(','),
              arrWarehouse: warehouseIds?.split(','),
              scope,
            },
          }}
        >
          <CarsDetailPage
            startTime={startTime}
            endTime={endTime}
            arrRegion={regionIds?.split(',')}
            arrWarehouse={warehouseIds?.split(',')}
            content={carsData}
            isServiceStation={-1}
            scope={scope}
          />
        </Card>
      )}

      <br />
      <br />

      <TabBar onChange={onChangeTabBar} />
    </div>
  )
}

export default Home
