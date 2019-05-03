/*
 * @Author: saber2pr
 * @Date: 2019-05-03 18:34:18
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-03 20:22:16
 */
import { HeaderNames } from './headers'
import { getXHR, Result } from './XMLHttpRequest'
import { Params } from './utils/stringify'
import { RequestConfig, MethodConfig } from './configTypes/types'
import { Interceptor } from './Interceptor'

export class Request {
  public constructor()
  public constructor(config: RequestConfig)
  public constructor(
    private config: RequestConfig = {
      baseURL: '',
      headers: {},
      timeout: 0
    }
  ) {}

  private setHeaders(
    XHR: XMLHttpRequest,
    Headers: Partial<Record<HeaderNames, string>> = {}
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
    XHR.timeout = timeout
    XHR.addEventListener('timeout', () => onTimeout(`[timeout]: ${timeout}`))
  }

  private async useRequestInterceptors(
    config: MethodConfig
  ): Promise<MethodConfig> {
    const value = await Promise.resolve(config)
    return Interceptor.requestInterceptors.interceptors.reduce(
      (pre, cur) => cur(pre),
      value
    )
  }

  private async useResponseInterceptors(
    resultPromise: Promise<Result>
  ): Promise<Result> {
    return resultPromise.then(result =>
      Interceptor.responseInterceptors.interceptors.reduce(
        (pre, cur) => cur(pre),
        result
      )
    )
  }

  public async get(url: string): Promise<Result>
  public async get(url: string, config: MethodConfig): Promise<Result>
  public async get(url: string, config: MethodConfig = {}): Promise<Result> {
    const resolveConfig = await this.useRequestInterceptors(config)
    return this.useResponseInterceptors(
      new Promise<Result>((resolve, reject) => {
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
        xhr.open('GET', target)
        xhr.send()
      })
    )
  }

  public async post(url: string, config: MethodConfig): Promise<Result> {
    const resolveConfig = await this.useRequestInterceptors(config)
    return this.useResponseInterceptors(
      new Promise<Result>((resolve, reject) => {
        const xhr = getXHR(resolve, reject)
        const target = this.config.baseURL + url
        this.setHeaders(xhr, resolveConfig.headers)
        this.setTimeout(xhr, resolveConfig.timeout, reject)
        let body = null
        if (resolveConfig.data) {
          body = JSON.stringify(resolveConfig.data)
        }
        xhr.open('POST', target)
        xhr.send(body)
      })
    )
  }
}
