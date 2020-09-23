// This component implement refs: https://vercel.com/design/popover
// @TODO 根据设计图，目前我们可能都是采用 full 这种样式。
// 所以 anchorOrigin, transformOrigin 这里的时候回存在 BUG

import cn from 'classnames'
import React, { useState, useEffect, useRef } from 'react'
import { noop } from '../utils'

export enum Vertical {
  Top = 'top',
  Center = 'center',
  Bottom = 'bottom',
}

export enum Horizontal {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

type Props = {
  trigger?: React.ReactNode
  debug?: boolean
  disabled?: boolean
  overlay?: boolean
  full?: boolean
  anchorOrigin?: { vertical: Vertical; horizontal: Horizontal }
  transformOrigin?: { vertical: Vertical; horizontal: Horizontal }
  onOpen?: Function
  onClose?: Function
  className?: String
}

const Popover: React.FC<Props> = (props) => {
  const {
    trigger,
    overlay,
    full = false,
    anchorOrigin = { vertical: Vertical.Top, horizontal: Horizontal.Right },
    transformOrigin = { vertical: Vertical.Top, horizontal: Horizontal.Right },
    onOpen = noop,
    onClose = noop,
    className = '',
  } = props

  // style Maps
  const anchorMap = {
    top: 0,
    bottom: '100%',
    center: '50%',
    left: 0,
    right: '100%',
  }
  const transformMap = {
    top: 0,
    bottom: '100%',
    left: 0,
    right: '100%',
    center: '50%',
  }

  const [open, setOpen] = useState<boolean>()
  const [offsetLeft, setOffsetLeft] = useState<number>()
  const triggerEl = useRef<HTMLDivElement>(null)

  function onTrigger() {
    open ? onClose() : onOpen()
    setOpen(!open)
  }

  useEffect(() => {
    const left = triggerEl.current?.getBoundingClientRect()?.left || 0
    setOffsetLeft(-left)
    // setOpen(!open == undefined ? false : !open)
  }, [full])

  return (
    <div className={cn('popover-details inline-flex relative', className)}>
      <div
        className={cn(
          'popover-summary inline-flex list-none outline-none cursor-pointer max-w-full',
          { overlay: open && overlay }
        )}
        ref={triggerEl}
        onClick={() => onTrigger()}
      >
        {trigger}
      </div>
      {open && (
        <>
          <div
            className={cn(
              'popover-arrow w-10 h-10 bg-white transform rotate-45 absolute top-full left-1/2 z-50'
            )}
          ></div>

          <div
            className={cn('top-15 absolute z-50', { 'w-screen': full })}
            style={{
              top: anchorMap[anchorOrigin.vertical],
              left: full ? offsetLeft : anchorMap[anchorOrigin.horizontal],
            }}
          >
            <div
              className={cn('popover-inner mt-5 relative')}
              style={{
                transform: `translate(${
                  transformMap[transformOrigin.horizontal]
                }, ${transformMap[transformOrigin.vertical]})`,
              }}
            >
              {props.children}
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .overlay::before {
          content: '';
          background: rgba(0, 0, 0, 0.3);
          position: fixed;
          top: -100vh;
          left: -100vw;
          right: -100vw;
          bottom: -100vh;
          cursor: default;
          z-index: 30;
        }
      `}</style>
    </div>
  )
}

export default Popover
