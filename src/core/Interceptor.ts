/*
 * @Author: saber2pr
 * @Date: 2019-05-03 20:03:24
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-03 20:11:29
 */
import { Result } from './XMLHttpRequest'
import { MethodConfig } from './configTypes/types'

export type interceptor<T> = (value: T) => T

export interface EjectInterceptor {
  (): void
}

export class Interceptor<T> {
  public interceptors: Array<interceptor<T>> = []
  public use(interceptor: interceptor<T>): EjectInterceptor {
    this.interceptors.push(interceptor)
    return () =>
      (this.interceptors = this.interceptors.filter(i => i !== interceptor))
  }
}

export namespace Interceptor {
  export const requestInterceptors = new Interceptor<MethodConfig>()
  export const responseInterceptors = new Interceptor<
    Result | PromiseLike<Result>
  >()

  export namespace request {
    export function use(interceptor: interceptor<MethodConfig>) {
      return requestInterceptors.use(interceptor)
    }
  }

  export namespace response {
    export function use(
      interceptor: interceptor<Result | PromiseLike<Result>>
    ) {
      return responseInterceptors.use(interceptor)
    }
  }
}
