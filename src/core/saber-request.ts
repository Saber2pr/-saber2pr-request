/*
 * @Author: saber2pr
 * @Date: 2019-05-03 18:34:18
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-11-22 10:46:01
 */
import { RequestHeaderNames } from "./headers/requestHeaders"
import { getXHR } from "./XMLHttpRequest"
import { stringify } from "./utils/stringify"
import { RequestConfig } from "./configTypes/requestConfig"
import { Interceptor } from "./Interceptor"
import { ResponseConfig } from "./configTypes/responseConfig"
import { preserve } from "./utils/preserve"

export class Request {
  public constructor()
  public constructor(config: RequestConfig)
  public constructor(config: RequestConfig = {}) {
    Object.assign(this.config, config)
  }
  static create = (config: RequestConfig = {}) => new Request(config)
  create = (config: RequestConfig = {}) => new Request(config)

  private readonly config: Readonly<RequestConfig> = {
    timeout: 5000,
    headers: {},
    baseURL: "",
    params: {},
    method: "GET",
    url: "",
    withCredentials: false
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
      XHR.addEventListener("timeout", () => onTimeout(`[timeout]: ${timeout}`))
    } else {
      setTimeout(() => onTimeout(`[timeout]: ${timeout}`), timeout)
    }
  }

  private setCredentials(
    XHR: XMLHttpRequest,
    withCredentials: boolean = this.config.withCredentials
  ) {
    XHR.withCredentials = withCredentials
  }

  private useRequestInterceptors = async (config: RequestConfig) =>
    await this.interceptors.requestInterceptors.interceptors.reduce(
      (pre, cur) => cur(pre),
      config
    )

  private useResponseInterceptors = async (
    resultPromise: Promise<ResponseConfig<any>>
  ) =>
    await resultPromise.then(result =>
      this.interceptors.responseInterceptors.interceptors.reduce(
        (pre, cur) => cur(pre),
        result
      )
    )

  public async get<T>(url: string): Promise<ResponseConfig<T>>
  public async get<T>(
    url: string,
    config: RequestConfig
  ): Promise<ResponseConfig<T>>
  public async get<T>(
    url: string,
    config: RequestConfig = {}
  ): Promise<ResponseConfig<T>> {
    preserve(config, this.config)
    config.method = "GET"
    config.url = url
    const resolveConfig = await this.useRequestInterceptors(config)

    const resultPromise = new Promise<ResponseConfig<T>>((resolve, reject) => {
      const xhr = getXHR(resolve, reject)

      let target = this.config.baseURL + url
      if (Object.keys(resolveConfig.params).length) {
        const urlParams = stringify(resolveConfig.params)
        if (url.includes("?")) {
          target += `&${urlParams}`
        } else {
          target += `?${urlParams}`
        }
      }
      xhr.open(config.method, target)

      this.setCredentials(xhr, config.withCredentials)
      this.setHeaders(xhr, resolveConfig.headers)
      this.setTimeout(xhr, resolveConfig.timeout, reject)

      xhr.send()
    })

    return await this.useResponseInterceptors(resultPromise)
  }

  public async fetch<T>(
    url: string,
    config: RequestConfig = {}
  ): Promise<ResponseConfig<T>> {
    preserve(config, this.config)
    config.url = url
    const resolveConfig = await this.useRequestInterceptors(config)

    const resultPromise = new Promise<ResponseConfig<T>>((resolve, reject) => {
      const xhr = getXHR(resolve, reject)

      const target = this.config.baseURL + url
      let body = null
      if (resolveConfig.params) {
        body = JSON.stringify(resolveConfig.params)
      }
      xhr.open(config.method || this.config.method, target)

      this.setCredentials(xhr, config.withCredentials)
      this.setHeaders(xhr, resolveConfig.headers)
      this.setTimeout(xhr, resolveConfig.timeout, reject)

      xhr.send(body)
    })

    return await this.useResponseInterceptors(resultPromise)
  }

  public async post<T>(
    url: string,
    config: RequestConfig = {}
  ): Promise<ResponseConfig<T>> {
    config.method = "POST"
    return await this.fetch(url, config)
  }

  public async put<T>(
    url: string,
    config: RequestConfig = {}
  ): Promise<ResponseConfig<T>> {
    config.method = "PUT"
    return await this.fetch(url, config)
  }

  public async delete<T>(
    url: string,
    config: RequestConfig = {}
  ): Promise<ResponseConfig<T>> {
    config.method = "DELETE"
    return await this.fetch(url, config)
  }
}
