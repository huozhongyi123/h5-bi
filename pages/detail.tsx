import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import useSWR from 'swr'
import Head from 'next/head'
import HeaderCustom from '../components/HeaderCustom'
import TabSwitch from '../components/TabSwitch'
import OverviewDetailPage from '../components/OverviewDetail'
import CarsDetailPage from '../components/CarsDetail'
import Skeleton from '../components/Skeleton'
import RoutesDetailPage from '../components/RoutesDetail'
import GroupPointDetail from '../components/GroupPointDetail'
import { isWechat } from '../utils'
import postfetch from '../utils/fetcher'
import { Scope } from '../constants'

import {
  OverviewDetail,
  OverviewData,
  RoutesDetail,
  TotalType,
  RoutesData,
  GroupPointsDetail,
  GroupPointsData,
  CarsDetail,
  CarsData,
} from '../interface/DetailData'

interface TabItem {
  text: string
  active: boolean
}

interface FetchData {
  deliveryStartTime: string
  deliveryEndTime: string
  areaId?: string[] | Array<number>
  warehouseIdList?: string[] | Array<number>
  dataType?: string | number
}

const fetcher = function (
  url: string,
  deliveryStartTime: string,
  deliveryEndTime: string,
  arrRegion: number[] | Array<number> | string,
  arrWarehouse: string | Array<number>,
  scope: string | null
) {
  let data: FetchData = {
    deliveryStartTime: deliveryStartTime.replace(/\./g, '-'),
    deliveryEndTime: deliveryEndTime.replace(/\./g, '-'),
  }
  if (arrRegion != '' && scope != 'global') {
    data.areaId = arrRegion instanceof Array ? arrRegion : [arrRegion]
  }
  if (arrWarehouse != '' && scope == undefined) {
    data.warehouseIdList =
      arrWarehouse instanceof Array ? arrWarehouse : [arrWarehouse]
  }
  if (scope != 'warehouse') {
    data.dataType = scope == 'global' ? 1 : 2
  }

  return postfetch(url, { body: JSON.stringify(data) })
}

const DetailIndex: NextPage = () => {
  let detailData: any // RoutesDetail | OverviewDetail | undefined | GroupPointsDetail | CarsDetail
  const router = useRouter()
  const path = router.query.path as string
  const startTime = router.query.startTime as string
  const endTime = router.query.endTime as string
  const arrRegion = router.query.arrRegion as string | string[]
  const arrWarehouse = router.query.arrWarehouse
  const scope = (router.query.scope || 'global') as Scope
  if (path) {
    if (path == 'overview') {
      const { data } = useSWR<OverviewDetail>(
        path == 'overview'
          ? scope == 'warehouse'
            ? [
                '/data-board/overview-detail',
                startTime,
                endTime,
                arrRegion,
                arrWarehouse,
              ]
            : [
                '/data-board/overview-more',
                startTime,
                endTime,
                arrRegion,
                arrWarehouse,
                scope,
              ]
          : null,
        fetcher,
        { revalidateOnFocus: false }
      )
      detailData = data
    } else if (path == 'routes') {
      const { data } = useSWR<RoutesDetail>(
        path == 'routes'
          ? scope == 'warehouse'
            ? [
                '/data-board/line-detail',
                startTime,
                endTime,
                arrRegion,
                arrWarehouse,
              ]
            : [
                '/data-board/line-more',
                startTime,
                endTime,
                arrRegion,
                arrWarehouse,
                scope,
              ]
          : null,
        fetcher,
        { revalidateOnFocus: false }
      )
      detailData = data
    } else if (path == 'groupPoints') {
      const { data } = useSWR<GroupPointsDetail>(
        path == 'groupPoints'
          ? scope == 'warehouse'
            ? [
                '/data-board/partner-detail',
                startTime,
                endTime,
                arrRegion,
                arrWarehouse,
              ]
            : [
                '/data-board/partner-more',
                startTime,
                endTime,
                arrRegion,
                arrWarehouse,
                scope,
              ]
          : null,
        fetcher,
        { revalidateOnFocus: false }
      )
      detailData = data
    } else if (path == 'cars') {
      const { data } = useSWR<CarsDetail>(
        path == 'cars'
          ? scope == 'warehouse'
            ? [
                '/data-board/vehicle-data-board-detail',
                startTime,
                endTime,
                arrRegion,
                arrWarehouse,
              ]
            : [
                '/data-board/vehicle-more',
                startTime,
                endTime,
                arrRegion,
                arrWarehouse,
                scope,
              ]
          : null,
        fetcher,
        { revalidateOnFocus: false }
      )
      detailData = data
    }
  } else {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        数据拉取异常
      </div>
    )
  }

  const [title] = useState<string>('详情')
  const [iswechat, setIswechat] = useState<boolean>(false)
  const [point, setPoint] = useState<number>(-1)
  const [content, setContent] = useState<TotalType<OverviewData>>()
  const [routesContent, setRoutesContent] = useState<TotalType<RoutesData>>()
  const [pointContent, setPoutesContent] = useState<
    TotalType<GroupPointsData>
  >()
  const [carsContent, setCarsContent] = useState<TotalType<CarsData>>()
  const [tabList, setTabList] = useState<Array<TabItem>>([
    {
      text: '全部',
      active: true,
    },
    {
      text: '子站',
      active: false,
    },
    {
      text: '服务站',
      active: false,
    },
  ])

  const switchTablist = async (num: number) => {
    let arr = tabList
    arr.map((res, index) => {
      if (num == index) {
        res.active = true
      } else {
        res.active = false
      }
    })
    setPoint(num - 1)
    if (detailData != undefined) {
      switch (path) {
        case 'overview':
          if (num == 0) setContent(detailData.totalData)
          if (num == 1) setContent(detailData.subSiteData)
          if (num == 2) setContent(detailData.serviceStation)
          break
        case 'routes':
          if (num == 0) setRoutesContent(detailData.totalData)
          if (num == 1) setRoutesContent(detailData.subSiteData)
          if (num == 2) setRoutesContent(detailData.serviceStation)
          break
        case 'groupPoints':
          if (num == 0) setPoutesContent(detailData.totalData)
          if (num == 1) setPoutesContent(detailData.subSiteData)
          if (num == 2) setPoutesContent(detailData.serviceStation)
          break
        case 'cars':
          if (num == 0) setCarsContent(detailData.totalData)
          if (num == 1) setCarsContent(detailData.subSiteData)
          if (num == 2) setCarsContent(detailData.serviceStation)
          break
      }
    }
    setTabList([...arr])
  }

  useEffect(() => {
    setIswechat(isWechat())
    if (detailData != undefined) {
      switch (path) {
        case 'overview':
          setContent(detailData.totalData)
          break
        case 'routes':
          setRoutesContent(detailData.totalData)
          break
        case 'groupPoints':
          setPoutesContent(detailData.totalData)
          break
        case 'cars':
          setCarsContent(detailData.totalData)
          break
      }
    }
  }, [detailData])

  return (
    <div className="relative">
      <Head>
        <title>
          {path == 'overview'
            ? '概览'
            : path == 'routes'
            ? '线路'
            : path == 'groupPoints'
            ? '团点'
            : '车辆'}
          详情
        </title>
      </Head>
      {!iswechat && <HeaderCustom title={title}></HeaderCustom>}
      <div className="w-full h-10 bg-gray-bg"></div>
      <div className="sticky top-0 left-0 w-full h-50 z-10">
        <TabSwitch tabList={tabList} switchTablist={switchTablist}></TabSwitch>
      </div>
      {path == 'overview' ? (
        content ? (
          <div className="p-15 pt-10 mt-15 pb-30 bg-white">
            <OverviewDetailPage content={content} />
          </div>
        ) : (
          <div className="px-15 mt-10">
            <Skeleton width={80} height={20} boxHeight={30} />
            <Skeleton className="w-full" height={20} boxHeight={30} />
            <Skeleton className="w-full" height={20} boxHeight={30} />
            <Skeleton className="w-full" height={200} boxHeight={230} />
          </div>
        )
      ) : (
        ''
      )}
      {path == 'routes' ? (
        routesContent ? (
          <div className="p-15 pt-10 mt-15 pb-30 bg-white">
            <RoutesDetailPage
              content={routesContent}
              startTime={startTime}
              endTime={endTime}
              arrRegion={arrRegion}
              arrWarehouse={arrWarehouse}
              isServiceStation={point}
              scope={scope}
            />
          </div>
        ) : (
          <div className="px-15 mt-10">
            <Skeleton width={80} height={20} boxHeight={30} />
            <Skeleton className="w-full" height={20} boxHeight={30} />
            <Skeleton className="w-full" height={20} boxHeight={30} />
            <Skeleton className="w-full" height={200} boxHeight={230} />
          </div>
        )
      ) : (
        ''
      )}
      {path == 'groupPoints' ? (
        pointContent ? (
          <div className="p-15 pt-10 mt-15 pb-30 bg-white">
            <GroupPointDetail
              startTime={startTime}
              endTime={endTime}
              arrRegion={arrRegion}
              arrWarehouse={arrWarehouse}
              content={pointContent}
              isServiceStation={point}
              scope={scope}
            />
          </div>
        ) : (
          <div className="px-15 mt-10">
            <Skeleton width={80} height={20} boxHeight={30} />
            <Skeleton className="w-full" height={20} boxHeight={30} />
            <Skeleton className="w-full" height={20} boxHeight={30} />
            <Skeleton className="w-full" height={200} boxHeight={230} />
          </div>
        )
      ) : (
        ''
      )}
      {path == 'cars' ? (
        carsContent ? (
          <div className="p-15 pt-10 mt-15 pb-30 bg-white">
            <CarsDetailPage
              startTime={startTime}
              endTime={endTime}
              arrRegion={arrRegion}
              arrWarehouse={arrWarehouse}
              content={carsContent}
              isServiceStation={point}
              scope={scope}
            />
          </div>
        ) : (
          <div className="px-15 mt-10">
            <Skeleton width={80} height={20} boxHeight={30} />
            <Skeleton className="w-full" height={20} boxHeight={30} />
            <Skeleton className="w-full" height={20} boxHeight={30} />
            <Skeleton className="w-full" height={200} boxHeight={230} />
          </div>
        )
      ) : (
        ''
      )}
    </div>
  )
}

export default DetailIndex
