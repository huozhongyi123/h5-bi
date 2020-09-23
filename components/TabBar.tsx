import cn from 'classnames'
import React, { useState, useEffect } from 'react'
import { noop } from '../utils'
import { TabBarItems, TabBarItem, Scope } from '../constants'

type Props = {
  onChange?: Function
}

const TabBar: React.FC<Props> = ({ onChange = noop }) => {
  const [tabItems, setTabItems] = useState(TabBarItems)

  let authority: Scope = 'global'
  // fetch authority from sessionStorage
  if (typeof window !== 'undefined') {
    const { wh_areas, wh_warehouse } =
      JSON.parse(sessionStorage.getItem('userInfo') || '{}').content || {}
    if (wh_warehouse) {
      authority = 'warehouse'
    } else if (wh_areas) {
      authority = 'region'
    }
  }

  if (authority === 'warehouse') {
    return null
  }

  useEffect(() => {
    if (authority === 'region') {
      setTabItems([...tabItems.filter((item) => item.name !== 'global')])
    }
  }, [authority])

  function onClick(item: TabBarItem) {
    if (item.active) {
      return
    }
    tabItems.forEach((item) => (item.active = false))
    item.active = true
    onChange(item)
    setTabItems([...tabItems])
  }

  return (
    <div className="fixed w-full h-50 left-0 bottom-0 flex bg-white shadow-2xl">
      {tabItems.map((item) => (
        <div
          className={cn(
            'flex-1 flex items-center justify-center font-bold',
            item.active ? 'text-black text-19' : 'text-blue-black text-17'
          )}
          key={item.name}
          onClick={() => onClick(item)}
        >
          {item.value}
        </div>
      ))}
    </div>
  )
}

export default TabBar
