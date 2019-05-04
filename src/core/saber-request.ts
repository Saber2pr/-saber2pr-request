/*
 * @Author: saber2pr
 * @Date: 2019-05-03 18:34:18
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-03 23:21:56
 */
import { RequestHeaderNames } from './headers/requestHeaders'
import { getXHR } from './XMLHttpRequest'
import { Params } from './utils/stringify'
import { RequestConfig } from './configTypes/requestConfig'
import { Interceptor } from './Interceptor'
import { ResponseConfig } from './configTypes/responseConfig'

export class Request {
  public constructor()
  public constructor(config: RequestConfig)
  public constructor(config: RequestConfig = {}) {
    Object.assign(this.config, config)
  }

  private config: Readonly<RequestConfig> = {
    baseURL: '',
    headers: {},
    timeout: 5000,
    method: 'GET'
  }

  public interceptors = new Interceptor()

  private setHeaders(
    XHR: XMLHttpRequest,
    Headers: Partial<Record<RequestHeaderNames, string>> = {}
  ) {
    const headers = Object.assign(Headers, this.config.headers)
    Object.entries(headers).forEach(([k, v]) => XHR.setRequestHeader(k, v))
  }

  private setTimeout(
    XHR: XMLHttpRequest,
    Timeout: number,
    onTimeout: (reason: string) => void
  ) {
    const timeout = Timeout || this.config.timeout
    if (XHR.timeout) {
      XHR.timeout = timeout
      XHR.addEventListener('timeout', () => onTimeout(`[timeout]: ${timeout}`))
    } else {
      setTimeout(() => onTimeout(`[timeout]: ${timeout}`), timeout)
    }
  }

  private async useRequestInterceptors(
    config: RequestConfig
  ): Promise<RequestConfig> {
    const value = await Promise.resolve(config)

    return this.interceptors.requestInterceptors.interceptors.reduce(
      (pre, cur) => cur(pre),
      value
    )
  }

  private async useResponseInterceptors(
    resultPromise: Promise<ResponseConfig<any>>
  ): Promise<ResponseConfig<any>> {
    return resultPromise.then(result =>
      this.interceptors.responseInterceptors.interceptors.reduce(
        (pre, cur) => cur(pre),
        result
      )
    )
  }

  public async get<T>(url: string): Promise<ResponseConfig<T>>
  public async get<T>(
    url: string,
    config: RequestConfig
  ): Promise<ResponseConfig<T>>
  public async get<T>(
    url: string,
    config: RequestConfig = Object.assign({}, this.config)
  ): Promise<ResponseConfig<T>> {
    config.method = 'GET'
    config.url = url
    const resolveConfig = await this.useRequestInterceptors(config)

    return this.useResponseInterceptors(
      new Promise<ResponseConfig<T>>((resolve, reject) => {
        const xhr = getXHR(resolve, reject)
        let target = this.config.baseURL + url

        this.setHeaders(xhr, resolveConfig.headers)
        this.setTimeout(xhr, resolveConfig.timeout, reject)

        if (resolveConfig.data) {
          const urlParams = Params.stringify(resolveConfig.data)
          if (url.includes('?')) {
            target += `&${urlParams}`
          } else {
            target += `?${urlParams}`
          }
        }

        xhr.open(config.method, target)
        xhr.send()
      })
    )
  }

  public async fetch<T>(
    url: string,
    config: RequestConfig = Object.assign({}, this.config)
  ): Promise<ResponseConfig<T>> {
    config.url = url
    const resolveConfig = await this.useRequestInterceptors(config)

    return this.useResponseInterceptors(
      new Promise<ResponseConfig<T>>((resolve, reject) => {
        const xhr = getXHR(resolve, reject)
        const target = this.config.baseURL + url

        this.setHeaders(xhr, resolveConfig.headers)
        this.setTimeout(xhr, resolveConfig.timeout, reject)

        let body = null
        if (resolveConfig.data) {
          body = JSON.stringify(resolveConfig.data)
        }

        xhr.open(config.method || this.config.method, target)
        xhr.send(body)
      })
    )
  }

  public async post<T>(
    url: string,
    config: RequestConfig = Object.assign({}, this.config)
  ): Promise<ResponseConfig<T>> {
    config.method = 'POST'
    return this.fetch(url, config)
  }

  public async put<T>(
    url: string,
    config: RequestConfig = Object.assign({}, this.config)
  ): Promise<ResponseConfig<T>> {
    config.method = 'PUT'
    return this.fetch(url, config)
  }

  public async delete<T>(
    url: string,
    config: RequestConfig = Object.assign({}, this.config)
  ): Promise<ResponseConfig<T>> {
    config.method = 'DELETE'
    return this.fetch(url, config)
  }
}
