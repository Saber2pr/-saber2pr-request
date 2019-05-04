/*
 * @Author: saber2pr
 * @Date: 2019-05-04 21:06:32
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-04 21:09:33
 */
export function preserve(target: Object, source: Object) {
  Object.entries(source).forEach(([k, v]) => k in target || (target[k] = v))
  return target
}
