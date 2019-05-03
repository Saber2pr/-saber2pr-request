/*
 * @Author: saber2pr
 * @Date: 2019-05-03 22:20:21
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-05-03 22:20:21
 */
export function parseHeaders(Headers: string) {
  return Headers.split('\r\n')
    .filter(h => h)
    .map(header => header.split(': '))
    .reduce((out, [k, v]) => ({ ...out, [k]: v }), {})
}
