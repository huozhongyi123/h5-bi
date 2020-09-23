export type Scope = 'global' | 'region' | 'warehouse'

export type TabBarItem = {
  name: Scope
  value: string
  active: boolean
}
export const TabBarItems: TabBarItem[] = [
  { name: 'global', value: '全国', active: true },
  { name: 'region', value: '大区', active: false },
  { name: 'warehouse', value: '仓库', active: false },
]

export const isUnauthorizedCode = (code: number) => {
  const codes = new Set([300001, 300002])
  return codes.has(code)
}
