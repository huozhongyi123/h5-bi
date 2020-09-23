export interface OverviewDetail {
  serviceStation: TotalType<OverviewData>
  subSiteData: TotalType<OverviewData>
  totalData: TotalType<OverviewData>
}

export interface RoutesDetail {
  serviceStation: TotalType<RoutesData>
  subSiteData: TotalType<RoutesData>
  totalData: TotalType<RoutesData>
}

export interface GroupPointsDetail {
  serviceStation: TotalType<RoutesData>
  subSiteData: TotalType<RoutesData>
  totalData: TotalType<RoutesData>
}

export interface CarsDetail {
  serviceStation: TotalType<CarsData>
  subSiteData: TotalType<CarsData>
  totalData: TotalType<CarsData>
}

export interface TotalType<T> {
  /** 柱状图 */
  detailData: Array<T>
  /** 总体数据 */
  totalData: T
}

export interface OverviewData extends PublicDetail {
  /** 配送单总数 */
  orderCount: number
  /** 配送单环比 */
  orderCountSequential: number
  /** 车牌号 */
  driverCarPlate: null | number
  /** 已完成配送单总数 */
  finishOrderCount: number
  /** 已完成配送单环比 */
  finishOrderCountSequential: number
  /** 已完成spu金额环比 */
  finishGoodsAmountSequential: number
  /** 已完成spu金额 */
  finishSpecificationsAmount: number
  /** 已完成spu数 */
  finishSpecificationsCount: number
  /** 已完成spu数环比 */
  finishSpecificationsCountSequential: number
  /** spu金额 */
  specificationsAmount: number
  /** spu金额环比 */
  specificationsAmountSequential: number
  /** spu总数 */
  specificationsCount: number
  /** spu数环比 */
  specificationsCountSequential: number
}

export interface RoutesData extends PublicDetail {
  /** 车牌号 */
  driverCarPlate: null | string
  /** 完成线路数 */
  finishLineCount: number
  /** 完成比例 */
  finishLinePercent: number
  /** 完成比例环比 */
  finishLinePercentSequential: number
  /** 完成数环比 */
  finishLineSequential: number
  /** 14点未完成数量 */
  fourteenNoFinishLineCount: number
  noDeliveryDateFinishCount: number
  noFinishAndDeliveryDateNoToday: number
  /** 未完成线路数 */
  noFinishCount: number
  /** 16点未完成数量 */
  sixteenNoFinishLineCount: number
  /** 总线路数 */
  totalLineCount: number
  /** 线路数环比 */
  totalLineSequential: number
}

export interface GroupPointsData extends PublicDetail {
  /** 平均团点金额（元） */
  avgSpecificationsAmount: number
  /** 平均团点金额（元）-环比 */
  avgSpecificationsAmountSequential: number
  /** 平均团点商品（件） */
  avgSpecificationsCount: number
  /** 平均团点商品（件）-环比 */
  avgSpecificationsCountSequential: number
  /** 距离过远交接点位（个） */
  distanceFarPointCount: number
  /** 距离过远交接点位（个）-环比 */
  distanceFarPointCountSequential: number
  driverCarPlate: string | null
  /** 异常标记点位 */
  exceptionPointCount: number
  /** 异常标记点位-环比 */
  exceptionPointCountSequential: number
  /** 已完成团点（个） */
  finishResidentialCount: number
  /** 已完成团点（个）-环比 */
  finishResidentialCountSequential: number
  /** 完成比例 */
  finishResidentialRate: number
  /** 完成比例-环比 */
  finishResidentialRateSequential: number
  groupKey: number | null
  /** 总团点数（个） */
  residentialCount: number
  /** 总团点数（个）-环比 */
  residentialCountSequential: number
  siteId: number | null
  /** 团点总金额（元） */
  specificationsAmount: number
  /** 团点总商品（件） */
  specificationsCount: number
  /** 未完成甜点(个) */
  unFinishResidentialCount: number
}

export interface CarsData extends PublicDetail {
  /** 单车金额 */
  avgAmount: number
  /** 单车数量 */
  avgCount: number
  avgLoadCount: number
  avgLoadRate: number
  avgMile: number
  driverCarPlate: string
  /** 最早发车时间 */
  earliestTime: string
  groupKey: number
  /** 最晚发车时间 */
  latestTime: string
  /** 单车平均装载点位(个) */
  loadCount: number
  /** 单车平均装载点位环比 */
  loadCountSequential: number
  /** 单车平均满载率 */
  loadRate: number
  /** 单车平均满载率环比 */
  loadRateSequential: number
  /** 平均线路行驶里程 */
  mile: number
  mileSequential: number
  /** 单车平均装载金额 */
  specificationsAmount: number
  /** 单车平均装载金额环比 */
  specificationsAmountSequential: number
  /** 单车平均装载商品(件) */
  specificationsCount: number
  /** 单车平均装载商品(件)环比 */
  specificationsCountSequential: number
  /** 总线路数 */
  totalCount: number
}

export interface PublicDetail {
  /** 是不是服务站数据 1 是 0不是 */
  isServiceStation: null | number
  /** 柱状图横坐标名称 */
  orgName: string
  /** 子站id */
  subSiteId: null | number
  warehouseId: null | number
}
