import React from 'react'
import cn from 'classnames'

interface TabItem {
  text: string
  active: boolean
}
interface Props {
  buttomList: Array<TabItem>
  switchTabButton: Function
}
const TabSign: React.FC<Props> = ({ buttomList, switchTabButton }) => {
  const itemClassName = (active: boolean) =>
    `list flex flex-1 items-center justify-center py-10 ${
      active ? 'bg-primary text-white rounded-md -m-1' : 'text-primary'
    }`
  return (
    <div className="bg-blue-sky flex flex-1 border rounded-md border-primary overflow-hidden">
      {buttomList.map((res, index) => (
        <div
          className={itemClassName(res.active)}
          key={index}
          onClick={() => switchTabButton(index)}
        >
          <div
            className={cn(
              'tabText w-full flex justify-center',
              buttomList.length == 2 ? '' : 'border-r border-primary'
            )}
          >
            {res.text}
          </div>
        </div>
      ))}
      <style jsx>{`
        .list:last-child .tabText {
          border: none;
        }
      `}</style>
    </div>
  )
}

export default TabSign
