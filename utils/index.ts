export function isDecimal(n: any) {
  return parseFloat(n) === n
}

export function getDecimalsLength(n: number): number {
  return n.toString().split('.')[1]?.length
}

export function isWechat() {
  const objNavigator = window?.navigator || ''
  const ua = objNavigator.userAgent.toLowerCase()
  if (/MicroMessenger/i.test(ua)) {
    return true
  }
  return false
}

export function filterDate(str: string): string {
  if (str) {
    const arr = str.split(' ')
    return arr[1].slice(0, 5)
  } else {
    return ''
  }
}

export function filterDistance(num: number): string {
  if (num) {
    if (String(num).length > 3) {
      return (num / 1000).toFixed(2) + 'km'
    } else {
      return num + 'm'
    }
  } else {
    return ''
  }
}

export function filterBasic(num: number): number {
  if (num) {
    if (Math.round(num * 100) == 0) {
      return Math.round(num * 100) / 100 + 0.01
    }
    return Math.round(num * 100) / 100
  } else {
    return 0
  }
}

export function noop(): void {}
