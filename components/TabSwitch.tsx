import React from 'react'

interface TabItem {
  text: string
  active: boolean
}
interface Props {
  tabList: Array<TabItem>
  switchTablist: Function
}
const Switch: React.FC<Props> = ({ tabList, switchTablist }) => {
  const itemClassName = (active: boolean) =>
    `flex items-center justify-center py-12 ${
      active ? 'border-b-2 border-primary text-primary font-bold' : ''
    }`
  return (
    <div className="bg-white grid grid-cols-3">
      {tabList.map((res, index) => (
        <div
          className={itemClassName(res.active)}
          key={index}
          onClick={() => switchTablist(index)}
        >
          {res.text}
        </div>
      ))}
    </div>
  )
}

export default Switch
