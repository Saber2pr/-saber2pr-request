/*
 * @Author: saber2pr
 * @Date: 2019-05-03 19:10:47
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-04 21:17:22
 */
export function stringify(obj: Object) {
  return Object.entries(obj)
    .map(([k, v]) => `${k}=${v}`)
    .join('&')
}
