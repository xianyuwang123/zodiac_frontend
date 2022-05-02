/**
 * @description 保存cookie
 * @param {Object} json 需要存储cookie的对象
 * @param {Number} days 默认存储多少天
 */
function setCookie(json: Record<string, unknown>, days: number): void {
  // 设置过期时间
  const data = new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000).toUTCString()

  for (const key in json) {
    document.cookie = key + '=' + json[key] + '; expires=' + data + '; path=/'
  }
}

/**
 * @description 获取cookie
 * @param {String} name 需要获取cookie的key
 */
function getCookie(name: string): string | null {
  const arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
  if (arr != null) {
    return unescape(arr[2])
  } else {
    return null
  }
}

/**
 * @description 删除cookie
 * @param {String} name 需要删除cookie的key
 */
function clearCookie(name: string): void {
  const json: any = {}
  json[name] = ''
  setCookie(json, -1)
}

export default {
  setCookie,
  getCookie,
  clearCookie,
}
