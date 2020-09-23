export interface RegionType {
  orgId: string
  name: string
  childList: Array<RegionType>
  active?: boolean
}

export interface WholeCountry {
  orgId: string
  name: string | null
  parentOrgId: number | null
  childList: Array<RegionType>
}
