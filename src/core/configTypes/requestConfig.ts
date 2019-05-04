/*
 * @Author: saber2pr
 * @Date: 2019-05-03 20:10:11
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-03 22:45:55
 */
import { RequestHeaderNames } from '../headers/requestHeaders'

export interface RequestConfig {
  timeout?: number
  headers?: Partial<Record<RequestHeaderNames, string>>
  baseURL?: string
  data?: Object
  method?: string
  url?: string
}
