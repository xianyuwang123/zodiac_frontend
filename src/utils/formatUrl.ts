import { FEATURE_FLAGS } from '../utils/features'
import { toBoolean } from '../utils'

export const extractParamsAsObject = (query: string) => {
  query = query.substring(query.indexOf('?') + 1)

  const re = /([^&=]+)=?([^&]*)/g
  const decodeRE = /\+/g

  const decode = function (str: string) {
    return decodeURIComponent(str.replace(decodeRE, ' '))
  }

  const params: any = {}
  let e
  while ((e = re.exec(query))) {
    let k = decode(e[1])
    const v = decode(e[2])
    if (k.substring(k.length - 2) === '[]') {
      k = k.substring(0, k.length - 2)
      ;(params[k] || (params[k] = [])).push(v)
    } else params[k] = v
  }

  const assign = function (obj: any, keyPath: any[], value: any) {
    const lastKeyIndex = keyPath.length - 1
    for (let i = 0; i < lastKeyIndex; ++i) {
      const key = keyPath[i]
      if (!(key in obj)) obj[key] = {}
      obj = obj[key]
    }
    obj[keyPath[lastKeyIndex]] = value
  }

  for (const prop in params) {
    const structure = prop.split('[')
    if (structure.length > 1) {
      const levels: string[] = []
      structure.forEach(function (item, i) {
        const key = item.replace(/[?[\]\\ ]/g, '')
        levels.push(key)
      })
      assign(params, levels, params[prop])
      delete params[prop]
    }
  }
  return params
}

export const extractParams = (query: string): Record<string, unknown> => {
  return query
    .slice(1)
    .split('&')
    .map((p) => p.split('='))
    .reduce((obj, pair) => {
      const [key, value] = pair.map(decodeURIComponent)
      return { ...obj, [key]: value }
    }, {})
}

export const isDebugOn = (): boolean => {
  const qeuryParams = window?.location?.search
  const enabledDebugConsole = FEATURE_FLAGS.ENABLED.DEBUG_CONSOLE
  if (enabledDebugConsole && !!qeuryParams) {
    const params = extractParams(qeuryParams)
    return params && toBoolean(params['__debug__'] as any)
  }
  return false
}
