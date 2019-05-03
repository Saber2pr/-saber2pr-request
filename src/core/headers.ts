/*
 * @Author: saber2pr
 * @Date: 2019-05-03 18:21:02
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-03 18:47:21
 */
export type HeaderNames =
  | 'Accept'
  | 'Accept-Charset'
  | 'Accept-Encoding'
  | 'Accept-Datetime'
  | 'Accept-Language'
  | 'Authorization'
  | 'Cache-Control'
  | 'Connection'
  | 'Content-Length'
  | 'Content-MD5'
  | 'Content-Type'
  | 'Cookie'
  | 'Date'
  | 'Expect'
  | 'Forwarded'
  | 'From'
  | 'Host'
  | 'If-Match'
  | 'If-Modified-Since'
  | 'If-None-Match'
  | 'If-Range'
  | 'If-Unmodified-Since'
  | 'Max-Forwards'
  | 'Origin'
  | 'Pragma'
  | 'Proxy-Authorization'
  | 'Range'
  | 'Referer'
  | 'TE'
  | 'Upgrade'
  | 'User-Agent'
  | 'Via'
  | 'Warning'
  | 'X-Requested-With'
  | 'DNT'
  | 'X-Forwarded-For'
  | 'X-Forwarded-Host'
  | 'X-Forwarded-Proto'
  | 'Front-End-Https'
  | 'X-Http-Method-Override'
  | 'X-ATT-DeviceId'
  | 'X-Wap-Profile'
  | 'Proxy-Connection'
  | 'X-UIDH'
  | 'X-Csrf-Token'
  | 'X-CSRFToken'
  | 'X-XSRF-TOKEN'
  | 'X-Request-ID'
  | 'X-Correlation-ID'

export namespace Header {
  export function append(headers: Headers, name: HeaderNames, value: string) {
    headers.append(name, value)
  }
  export function deleteHeader(headers: Headers, name: HeaderNames) {
    headers.delete(name)
  }
  export function forEach(
    headers: Headers,
    callbackfn: (value: string, key: HeaderNames, parent: Headers) => void,
    thisArg?: any
  ) {
    headers.forEach(callbackfn, thisArg)
  }
  export function get(headers: Headers, name: HeaderNames) {
    return headers.get(name)
  }
  export function has(headers: Headers, name: HeaderNames) {
    return headers.has(name)
  }
  export function set(headers: Headers, name: HeaderNames, value: string) {
    headers.set(name, value)
  }
}
