/*
 * @Author: saber2pr
 * @Date: 2019-05-03 21:46:39
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-04 10:49:13
 */
import { ResponseConfig } from './configTypes/responseConfig'
import { parseHeaders } from './utils/parseHeaders'

export function getXHR(
  resolve: (result: ResponseConfig<any>) => void,
  reject: (result: ResponseConfig<any>) => void
) {
  const xhr = new XMLHttpRequest()

  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === 4) {
      let data: any
      try {
        data = JSON.parse(xhr.responseText)
      } catch (error) {
        data = xhr.responseText
      } finally {
        resolve({
          data,
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders())
        })
      }
    }
  })

  xhr.addEventListener('error', () => {
    let data: any
    try {
      data = JSON.parse(xhr.responseText)
    } catch (error) {
      data = xhr.responseText
    } finally {
      reject({
        data,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders())
      })
    }
  })

  return xhr
}
