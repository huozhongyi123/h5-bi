// @TODO Update some computed use `date-fns` dep
import React from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { noop } from '../utils'

interface MonthType {
  key: string
  value: number | string
  active: number
}

interface IProps {
  changeTime?: (startTime: string, endTime: string) => void
}

const DateSelect: React.FC<IProps> = ({ changeTime = noop }) => {
  const [weeklist] = React.useState<Array<string>>([
    '日',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
  ])

  const [nowDate] = React.useState<Date>(new Date())

  const [month, setMonth] = React.useState<number>(-1)

  const [year, setYear] = React.useState<number>(-1)

  const [daylist, setDaylist] = React.useState<Array<MonthType>>([])

  const [startTime, setStartTime] = React.useState<number>(-1)

  const [endTime, setEndTime] = React.useState<number>(-1)

  const isActive = (
    m: number,
    y: number,
    i: number,
    start: number,
    end: number
  ) => {
    const selectDate = new Date(`${y}/${m}/${i + 1}`)
    let active: number
    if (start == -1) {
      active = 0
    } else if (end == -1 && selectDate.getTime() == start) {
      active = 1
    } else if (selectDate.getTime() == start || selectDate.getTime() == end) {
      active = 1
    } else if (selectDate.getTime() > start && selectDate.getTime() < end) {
      active = 2
    } else {
      active = 0
    }
    return active
  }

  const updateDateColumn = (
    m: number,
    y: number,
    start: number,
    end: number
  ) => {
    m += 1

    let dateColumnRage: Array<MonthType>
    switch (m) {
      case 2:
        if (y % 4 != 0) {
          dateColumnRage = Array.from({ length: 28 }, (_, i) => {
            return {
              key: i + 1 + ' 日',
              value: i + 1,
              active: isActive(m, y, i, start, end),
            }
          })
        } else {
          dateColumnRage = Array.from({ length: 29 }, (_, i) => {
            return {
              key: i + 1 + ' 日',
              value: i + 1,
              active: isActive(m, y, i, start, end),
            }
          })
        }
        break
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        dateColumnRage = Array.from({ length: 31 }, (_, i) => {
          return {
            key: i + 1 + ' 日',
            value: i + 1,
            active: isActive(m, y, i, start, end),
          }
        })
        break
      default:
        dateColumnRage = Array.from({ length: 30 }, (_, i) => {
          return {
            key: i + 1 + ' 日',
            value: i + 1,
            active: isActive(m, y, i, start, end),
          }
        })
        break
    }
    let empteDate: Array<MonthType>
    if (year == -1) {
      const num = getMonthFirst(nowDate.getFullYear(), nowDate.getMonth() + 1)
      empteDate = Array.from({ length: num }, (_) => ({
        key: '',
        value: '',
        active: 0,
      }))
    } else {
      const num = getMonthFirst(y, m)
      empteDate = Array.from({ length: num }, (_) => ({
        key: '',
        value: '',
        active: 0,
      }))
    }

    setDaylist([...empteDate, ...dateColumnRage])
  }

  const [dataString, setDataString] = React.useState<string>()

  const prev = (y: number, m: number) => {
    if (m < 1) {
      y--
      setYear(y)
      m = 12
    }
    setDataString(`${y}年${m}月`)
    setMonth(m - 1)
    updateDateColumn(m - 1, y, startTime, endTime)
  }

  const next = (y: number, m: number) => {
    if (m + 1 > 11) {
      y++
      setYear(y)
      m = -1
    }
    setDataString(`${y}年${m + 2}月`)
    setMonth(m + 1)
    updateDateColumn(m + 1, y, startTime, endTime)
  }

  const selectDate = (y: number, m: number, d: string | number) => {
    let startDate: any
    startDate = new Date(`${y}/${m + 1}/${d}`)
    if (startTime != -1 && endTime != -1) {
      setStartTime(startDate.getTime())
      setEndTime(-1)
      updateDateColumn(m, y, startDate.getTime(), -1)
    } else if (startTime == -1 || startDate.getTime() == startTime) {
      setStartTime(startDate.getTime())
      updateDateColumn(m, y, startDate.getTime(), endTime)
    } else if (startTime > startDate.getTime()) {
      setStartTime(startDate.getTime())
      setEndTime(startTime)
      updateDateColumn(m, y, startDate.getTime(), startTime)
    } else {
      setEndTime(startDate.getTime())
      updateDateColumn(m, y, startTime, startDate.getTime())
    }
  }

  const finished = (start: number, end: number) => {
    if (start == -1) alert('日期未完成')
    const s = new Date(start)
    const e = new Date(end)
    const startStr = `${s.getFullYear()}-${s.getMonth() + 1}-${s.getDate()}`
    let endStr: string
    if (end == -1) {
      endStr = `${s.getFullYear()}-${s.getMonth() + 1}-${s.getDate()}`
    } else {
      endStr = `${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}`
    }
    changeTime(startStr, endStr)
  }

  React.useEffect(() => {
    setDataString(`${nowDate.getFullYear()}年${nowDate.getMonth() + 1}月`)
    setMonth(nowDate.getMonth())
    setYear(nowDate.getFullYear())
    updateDateColumn(
      nowDate.getMonth(),
      nowDate.getFullYear(),
      startTime,
      endTime
    )
  }, [])

  const getMonthFirst = (year: number, month: number) => {
    const dateMonth = new Date(`${year}/${month}/1`)
    return dateMonth.getDay()
  }

  const activeName = (active: number) => {
    return `w-22 h-22 flex items-center justify-center ${
      active == 1
        ? 'text-primary bg-blue-dark rounded-full'
        : active == 2
        ? 'text-primary'
        : ''
    }`
  }

  return (
    <div className="min-w-full absolute left-0 px-18 py-5 rounded-md bg-white">
      <div className="flex justify-center py-7 relative pt-15">
        <ChevronLeft
          className="text-gray"
          size="25"
          onClick={() => prev(year, month)}
        />
        <div className="text-15">{dataString}</div>
        <ChevronRight
          className="text-gray"
          size="25"
          onClick={() => next(year, month)}
        />
        <div
          className="absolute right-25 top-17 text-primary text-13"
          onClick={() => finished(startTime, endTime)}
        >
          完成
        </div>
      </div>
      <div className="bg-white grid grid-cols-7">
        {weeklist.map((res, index) => (
          <div className="flex items-center justify-center py-12" key={index}>
            {res}
          </div>
        ))}
        {daylist.map((res, index) => (
          <div
            className="flex items-center justify-center py-12"
            key={index}
            onClick={() => selectDate(year, month, res.value)}
          >
            <div className={activeName(res.active)}>{res.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DateSelect
