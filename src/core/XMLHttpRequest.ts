/*
 * @Author: saber2pr
 * @Date: 2019-05-03 19:04:36
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-03 19:07:12
 */
export interface Result {
  code: number
  message: string
}

export function getXHR(
  resolve: (result: Result) => void,
  reject: (result: Result) => void
) {
  const xhr = new XMLHttpRequest()

  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      resolve({
        code: xhr.status,
        message: xhr.responseText
      })
    }
  })

  xhr.addEventListener('error', () =>
    reject({
      code: xhr.status,
      message: xhr.responseText
    })
  )

  return xhr
}
