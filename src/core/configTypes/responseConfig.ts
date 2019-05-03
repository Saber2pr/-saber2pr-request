/*
 * @Author: saber2pr
 * @Date: 2019-05-03 21:46:05
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-03 22:02:38
 */
export interface ResponseConfig<T> {
  data: T
  status: number
  statusText: string
  headers: any
}
