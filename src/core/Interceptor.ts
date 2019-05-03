/*
 * @Author: saber2pr
 * @Date: 2019-05-03 20:03:24
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-03 22:01:35
 */
import { RequestConfig } from './configTypes/requestConfig'
import { ResponseConfig } from './configTypes/responseConfig'

export type interceptor<T> = (value: T) => T

export interface EjectInterceptor {
  (): void
}

export class InterceptorFactory<T> {
  public interceptors: Array<interceptor<T>> = []
  public use(interceptor: interceptor<T>): EjectInterceptor {
    this.interceptors.push(interceptor)
    return () =>
      (this.interceptors = this.interceptors.filter(i => i !== interceptor))
  }
}

export class Interceptor {
  public constructor(
    public requestInterceptors = new InterceptorFactory<RequestConfig>(),
    public responseInterceptors = new InterceptorFactory<
      ResponseConfig<any> | PromiseLike<ResponseConfig<any>>
    >()
  ) {}

  public request = {
    use: (interceptor: interceptor<RequestConfig>) =>
      this.requestInterceptors.use(interceptor)
  }

  public response = {
    use: <T>(interceptor: interceptor<ResponseConfig<T> | PromiseLike<ResponseConfig<T>>>) =>
      this.responseInterceptors.use(interceptor)
  }
}
