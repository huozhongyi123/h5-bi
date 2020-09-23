import React, { useState, useRef } from 'react'
import DateSelect from './DateSelect'
import Popover, { Vertical, Horizontal } from './Popover'
import { ChevronUp, ChevronDown } from 'react-feather'
import { noop } from '../utils'

type Props = {
  startTime: string
  endTime: string
  onChange?: (startTime: string, endTime: string) => void
  className?: string
}

const DatePicker: React.FC<Props> = ({
  startTime,
  endTime,
  onChange = noop,
  className,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const triggerEl = useRef<HTMLDivElement>(null)

  function changeTime(startTime: string, endTime: string) {
    onChange(startTime, endTime)
    setOpen(false)
    triggerEl.current?.click()
  }

  return (
    <Popover
      className={className}
      overlay
      full
      anchorOrigin={{
        vertical: Vertical.Bottom,
        horizontal: Horizontal.Left,
      }}
      transformOrigin={{
        vertical: Vertical.Top,
        horizontal: Horizontal.Left,
      }}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      trigger={
        <div
          className="pl-8 pr-2 py-12 text-12 bg-white rounded flex items-center w-193"
          ref={triggerEl}
        >
          <p className="font-medium">{startTime}</p>
          <p className="mx-1 text-gray-600">至 </p>
          <p className="font-medium">{endTime}</p>
          {open ? (
            <ChevronUp className="text-gray-600" size="18" />
          ) : (
            <ChevronDown className="text-gray-600" size="18" />
          )}
        </div>
      }
    >
      <div className="bg-white w-screen z-20">
        <DateSelect changeTime={changeTime}></DateSelect>
      </div>
    </Popover>
  )
}

export default DatePicker
