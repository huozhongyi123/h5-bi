export interface PartnerVehichle {
  /** 距离过远 */
  distanceFarPortList: Array<Vehichle>
  /** 异常标记 */
  exceptionList: Array<Vehichle>
  /** 未完成 */
  unFinishList: Array<Vehichle>
}

/** 团点明细(司机信息) */
export interface Vehichle {
  /** 司机名称 */
  driver: string
  /** 异常原因 */
  exceptionRemark: string
  /** 交接时间 */
  handoverTime: string
  /** 司机电话 */
  mobile: string
  /** 团长ID */
  partnerId: number
  /** 团长姓名 */
  partnerName: string
  /** 收货地址 */
  residentialAddress: string
  /** 已完成 */
  finishResidentialCount: number
  /** 总数 */
  totalCount: number
  /** 未完成 */
  unFinishResidentialCount: number
}

/** 线路明细司机信息列表 */
export interface VehichleBoard {
  /** 最早发车时间 */
  earlyDriverList: Array<CarsVehichle>
  /** 最晚发车时间 */
  lateDriverList: Array<CarsVehichle>
}

export interface CarsVehichle {
  /** 发车时间 */
  dispatchTime: string
  /** 司机 */
  driver: string | null
  driverMobile: string
}

export interface RoutesVehichle {
  /** 完成时间 */
  completeTime: string
  /** 配送日期 */
  deliveryDate: string
  /** 发车时间  */
  dispatchTime: string
  /** 司机姓名 */
  driver: string
  /** 车牌号 */
  driverCarPlate: string
  /** 司机手机号 */
  driverMobile: string
  /** 预计总里程 */
  expectTotalMileage: number
  /** 是否服务站 1 是 0 否 */
  isServiceStation: number
  /** 组织名称 */
  orgName: string
  status: number
  /** 子站id */
  subSiteId: number
  /** 仓库id */
  warehouseId: number
}

export interface RoutesBoard {
  /** 16点未完成 */
  fourteenNoFinishList: Array<RoutesVehichle>
  /** 14点未完成 */
  sixteenNoFinishList: Array<RoutesVehichle>
}
