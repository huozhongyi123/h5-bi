import React, { useState, useRef } from 'react'
import { ChevronUp, ChevronDown } from 'react-feather'
import { RegionType } from '../interface/WarePicker'
import Popover, { Vertical, Horizontal } from './Popover'
import { Scope } from '../constants'
import { noop } from '../utils'

import IconCircle from './IconCircle'
import IconCheckCircle from './IconCheckCircle'

type Props = {
  scope: Scope
  className?: string
  orgList: Array<any>
  warehouse: Array<RegionType>
  getWarehouse: Function
  onChange?: Function
  onMessage?: Function
}

const WarehousePicker: React.FC<Props> = ({
  scope,
  className,
  orgList,
  getWarehouse,
  warehouse,
  onChange = noop,
  onMessage = noop,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [region, setRegion] = React.useState<Array<RegionType>>(orgList)
  const [childList, setChildList] = React.useState<Array<RegionType>>(warehouse)
  const [childOpen, setChildOpen] = useState<boolean>(false)
  const triggerEl = useRef<HTMLDivElement>(null)
  const publicFilter = (arr: Array<RegionType>, id: number | string) => {
    if (id === '0') {
      const firstActive = arr[0].active
      arr.map((res) => {
        res.active = !firstActive
      })
    } else {
      let add = 0
      let sub = 0
      arr.map((res) => {
        if (res.orgId == id) {
          if (res.active) {
            res.childList.map((res) => {
              res.active = false
            })
          }
          res.active = !res.active
          res.childList.map((res) => {
            res.active = true
          })
        }
        if (res.active && res.orgId != '0') {
          add++
        } else if (!res.active && res.orgId != '0') {
          sub++
        }
      })
      if (add == arr.length - 1) {
        arr[0].active = true
      } else {
        arr[0].active = false
      }
      if (sub == arr.length - 1) arr[0].active = false
    }
    return arr
  }

  const childRegion = (id: number | string) => {
    const arr = publicFilter(childList, id)
    setChildList([...arr])
  }

  const selectRegion = (id: number | string) => {
    const arr = publicFilter(region, id)
    updataChildList(arr)
    setRegion([...arr])
  }

  const updataChildList = (arr: Array<RegionType>) => {
    let list: Array<RegionType> = []
    let add = 0
    arr.map((res: RegionType) => {
      const { active, orgId } = res
      if (active) {
        add++
      }
      if (active && orgId != '0') {
        list = [...list, ...res.childList]
      }
    })
    if (list.some((res) => res.orgId != '0')) {
      list.unshift({
        name: '全部',
        orgId: '0',
        active: add == arr.length ? true : false,
        childList: [],
      })
    }

    if (list.length == 0) {
      setChildOpen(false)
    } else {
      setChildOpen(true)
    }
    setChildList([...list])
  }

  const finished = (
    arrregion: Array<RegionType>,
    arrchildList: Array<RegionType>
  ) => {
    const regions = region
      .splice(1)
      .filter((item) => item.active)
      .map((item) => item.orgId)
    const warehouses = childList
      .splice(1)
      .filter((item) => item.active)
      .map((item) => item.orgId)
    if (scope == 'region' && regions.length == 0) {
      onMessage('请选择至少一项')
      return
    } else if (scope == 'warehouse' && warehouses.length == 0) {
      onMessage('请选择至少一项')
      return
    }
    getWarehouse(arrregion.slice(1), arrchildList.slice(1))
    setOpen(!open)
    triggerEl.current?.click()
    onChange(regions, warehouses)
  }

  const reset = () => {
    orgList.map((item) => {
      item.active = false
      item.childList.map((res: any) => {
        res.active = false
      })
    })
    setRegion([...orgList])
    setChildList([])
  }

  const onOpen = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  React.useEffect(() => {
    let arr = orgList
    if (arr[0] && arr[0].orgId == null) {
      arr = arr[0].childList
    }
    let add = 0
    arr.map((res) => {
      if (res.active) {
        add++
      }
      if (res.active == undefined || res.active == null) res.active = false
    })
    if (arr[0] && arr[0].orgId != '0') {
      arr.unshift({
        name: '全部',
        orgId: '0',
        active: add == arr.length ? true : false,
        childList: [],
      })
    }
    updataChildList(arr)
    setRegion([...arr])
  }, [orgList, warehouse])

  return scope === 'global' ? (
    <div className="ml-10">
      <div className="px-30 py-12 text-12 bg-white rounded flex items-center">
        全国
      </div>
    </div>
  ) : (
    <Popover
      className={className}
      overlay
      full
      onOpen={onOpen}
      onClose={onClose}
      anchorOrigin={{
        vertical: Vertical.Bottom,
        horizontal: Horizontal.Left,
      }}
      transformOrigin={{
        vertical: Vertical.Top,
        horizontal: Horizontal.Left,
      }}
      trigger={
        <div
          className="px-8 py-12 text-12 bg-white rounded flex items-center"
          ref={triggerEl}
        >
          {scope === 'region' ? '全部大区' : '全部仓库'}
          {open ? (
            <ChevronUp className="text-gray-600" size="18" />
          ) : (
            <ChevronDown className="text-gray-600" size="18" />
          )}
        </div>
      }
    >
      <div className="bg-white rounded-lg">
        <div className="px-25 py-20 flex max-h-350">
          <div className="flex-1 overflow-y-scroll">
            <h3 className="font-bold sticky -top-1 bg-white">大区</h3>
            <div className="mt-20 text-15">
              {(region || []).map((item, index) => (
                <div
                  className="flex items-center"
                  key={index}
                  onClick={() => selectRegion(item.orgId)}
                >
                  {item.active ? (
                    <IconCheckCircle className="mr-10" size="15" />
                  ) : (
                    <IconCircle className="mr-10" size="15" />
                  )}
                  {item.name}
                </div>
              ))}
            </div>
          </div>
          {scope === 'warehouse' && childOpen && (
            <div className="flex-1 overflow-y-scroll">
              <h3 className="font-bold sticky -top-1 bg-white">仓库</h3>
              <div className="mt-20 text-15">
                {(childList || []).map((item, index) => (
                  <div
                    className="flex items-center"
                    key={index}
                    onClick={() => childRegion(item.orgId)}
                  >
                    {item.active ? (
                      <IconCheckCircle className="mr-10" size="15" />
                    ) : (
                      <IconCircle className="mr-10" size="15" />
                    )}
                    <div className="w-138">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="h-45 flex border-t border-gray-light text-center">
          <a
            className="flex-1 flex items-center justify-center text-accents-9 cursor-pointer"
            onClick={() => reset()}
          >
            重置
          </a>
          <a
            className="flex-1 flex items-center justify-center border-l border-gray-light text-primary font-bold cursor-pointer"
            onClick={() => finished(region, childList)}
          >
            完成
          </a>
        </div>
      </div>
    </Popover>
  )
}

export default WarehousePicker
