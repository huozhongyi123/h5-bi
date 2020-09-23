import cn from 'classnames'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

// todo
// type OverviewName = '总订单' | '总金额' | 'SPU'
// type RoutesName = '已完成' | '未完成'
// type GroupPointsName = '已完成团点' | '未完成团点'
// type CarsName = '单车平均装载件数' | '单车平均装载金额'

// @TODO 使用泛型
export type ChartItem = {
  name: string //OverviewName | RoutesName | GroupPointsName | CarsName
  district: string
  value: number
}
type Props = {
  className?: string
  data: ChartItem[]
}

const Chart: React.FC<Props> = ({ className, data }) => {
  const ref = React.useRef(null)
  let chart: any = null

  useEffect(() => {
    const F2 = require('@antv/f2/lib/index-all')

    let _arr: string[] = []
    data.map(res => {
      const _name = res.name
      let isdown = _arr.some(res => res == _name)
      if (!isdown) {
        _arr.push(_name)
      }
    })
    const _num = _arr.length

    if (!chart) {
      chart = new F2.Chart({
        el: ReactDOM.findDOMNode(ref.current),
        pixelRatio: window.devicePixelRatio,
      })
      chart.source(data, {
        district: {
          formatter(item: string) {
            return item + '.'
          },
          type: 'cat',
          tickCount: 3,
          ticks: Array.from(new Set(data.map((item) => item.district))),
          values: Array.from(new Set(data.map((item) => item.district))).slice(
            0,
            3
          ),
        },
        value: {
          min: Math.min(...data.map((item) => item.value)),
          max: Math.max(...data.map((item) => item.value)),
          tickCount: 3,
        },
      })
      chart
        .interval()
        .position('district*value')
        .color('name')
        .style('value', {
          radius: [4, 4, 0, 0],
        })
        .shape('rect')
        .adjust({
          type: 'dodge',
          marginRatio: 0.05, // 设置分组间柱子的间距
        })
      chart.legend({
        position: 'bottom',
        align: 'center',
        marker: 'square',
      })
      chart.tooltip({
        triggerOn: ['touchstart', 'touchmove'],
        showCrosshairs: true,
        layout: 'vertical',
        offsetY: (_num - 1) * 25 - 10
      })
      chart.interaction('pan')
      chart.render()
    }
  }, [data])

  return <canvas ref={ref} className={cn('w-full', className)}></canvas>
}

export default Chart
