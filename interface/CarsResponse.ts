interface Car {
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
  isServiceStation: number
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
  /** 平均线路行驶里程环比 */
  mileSequential: number
  orgName: string
  /** 单车平均装载金额 */
  specificationsAmount: number
  /** 单车平均装载金额环比 */
  specificationsAmountSequential: number
  /** 单车平均装载商品(件) */
  specificationsCount: number
  /** 单车平均装载商品(件)环比 */
  specificationsCountSequential: number
  subSiteId: number
  /** 总线路数 */
  totalCount: number
  warehouseId: number
}

export interface CarsResponse {
  detailData: Car[]
  totalData: Car
}
