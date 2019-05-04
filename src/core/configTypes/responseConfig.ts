/*
 * @Author: saber2pr
 * @Date: 2019-05-04 09:28:23
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-04 09:28:45
 */
import { ResponseHeaderNames } from '../headers/responseHeaders'

export interface ResponseConfig<T> {
  data: T
  status: number
  statusText: string
  headers: Partial<Record<ResponseHeaderNames, string>>
}
