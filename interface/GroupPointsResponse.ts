interface GroupPonit {
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
  driverCarPlate: string
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
  groupKey: number
  isServiceStation: number
  orgName: string
  /** 总团点数（个） */
  residentialCount: number
  /** 总团点数（个）-环比 */
  residentialCountSequential: number
  siteId: number
  /** 团点总金额（元） */
  specificationsAmount: number
  /** 团点总商品（件） */
  specificationsCount: number
  subSiteId: number
  /** 未完成甜点(个) */
  unFinishResidentialCount: number
  warehouseId: number
}

export interface GroupPointsResponse {
  detailData: GroupPonit[]
  totalData: GroupPonit
}
