import unfetch from 'isomorphic-unfetch'
import { isUnauthorizedCode } from '../constants'

// @TOOD add fake for development
let token = ''
let openId = ''
let userId = ''
let X_Wh_Areas = ''
let X_Wh_Countrys = ''
let X_Wh_Warehouse = ''

if (typeof window !== 'undefined') {
  token = JSON.parse(sessionStorage.getItem('token') || '{}').content
  openId = JSON.parse(sessionStorage.getItem('openId') || '{}').content || ''
  let userInfo =
    JSON.parse(sessionStorage.getItem('userInfo') || '{}').content || {}
  userId = userInfo.user_id

  if (userInfo) {
    X_Wh_Areas = userInfo.wh_areas || ''
    X_Wh_Countrys = userInfo.wh_countrys || ''
    X_Wh_Warehouse = userInfo.wh_warehouse || ''
  }
}

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const API_ROOT = process.env.API_ROOT || ''
  init = {
    ...init,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      // API custom header
      token,
      openId,
      userId,
      'X-Wh-Areas': X_Wh_Areas,
      'X-Wh-Countrys': X_Wh_Countrys,
      'X-Wh-Warehouse': X_Wh_Warehouse,
    },
  }
  const response = await unfetch(API_ROOT + input, init)
  try {
    const { code, message, data } = await response.json()
    if (process.env.NODE_ENV === 'production' && isUnauthorizedCode(code)) {
      window.location.href = '/'
      throw Error('Unauthorized')
    } else if (code !== 0) {
      return Promise.reject({ code, message })
    }
    return Promise.resolve(data)
  } catch (error) {
    throw error
  }
}

export default fetcher
