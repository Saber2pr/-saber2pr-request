/*
 * @Author: saber2pr
 * @Date: 2019-05-03 21:46:39
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-03 22:20:35
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
      resolve({
        data: JSON.parse(xhr.responseText),
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders())
      })
    }
  })

  xhr.addEventListener('error', () =>
    reject({
      data: JSON.parse(xhr.responseText),
      status: xhr.status,
      statusText: xhr.statusText,
      headers: parseHeaders(xhr.getAllResponseHeaders())
    })
  )

  return xhr
}
