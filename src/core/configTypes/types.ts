/*
 * @Author: saber2pr
 * @Date: 2019-05-03 20:10:11
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-05-03 20:10:11
 */
import { HeaderNames } from '../headers'

export interface BaseConfig {
  timeout?: number
  headers?: Partial<Record<HeaderNames, string>>
}

export interface RequestConfig extends BaseConfig {
  baseURL?: string
}

export interface MethodConfig extends BaseConfig {
  data?: Object
}
