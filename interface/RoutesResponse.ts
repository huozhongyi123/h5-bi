interface Route {
  driverCarPlate: string
  /** 完成线路数 */
  finishLineCount: number
  /** 完成比例 */
  finishLinePercent: number
  finishLinePercentSequential: number
  /** 完成数环比 */
  finishLineSequential: number
  /** 14点未完成数量 */
  fourteenNoFinishLineCount: number
  isServiceStation: number
  noDeliveryDateFinishCount: number
  noFinishAndDeliveryDateNoToday: number
  /** 未完成线路数 */
  noFinishCount: number
  orgName: string
  /** 16点未完成数量 */
  sixteenNoFinishLineCount: number
  subSiteId: number
  /** 总线路数 */
  totalLineCount: number
  /** 线路数环比 */
  totalLineSequential: number
  warehouseId: number
}

export interface RoutesRepsone {
  detailData: Route[]
  totalData: Route
}
