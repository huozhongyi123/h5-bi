interface Overview {
  /** 配送单总数 */
  orderCount: number
  /** 配送单环比 */
  orderCountSequential: number
  /** 车牌号 */
  driverCarPlate: string
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
  isServiceStation: number
  orgName: string
  /** spu金额 */
  specificationsAmount: number
  /** spu金额环比 */
  specificationsAmountSequential: number
  /** spu总数 */
  specificationsCount: number
  /** spu数环比 */
  specificationsCountSequential: number
  subSiteId: number
  warehouseId: number
}

export interface OverviewResponse {
  detailData: Overview[]
  totalData: Overview
}
