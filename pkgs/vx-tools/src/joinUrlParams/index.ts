/**
 * 常用工具函数
 * @packageDocumentation
 * @module vx-tools/joinUrlParams
 */

/**
 * 拼接路由参数
 * @param { object } obj 参数对象
 * @example
 * ``` ts
 *  const parmas = {
 *    id: 1,
 *    name: 'Co'
 *  }
 * 
 *  const url = joinUrlParams('/users', params)
 *  // url = /users?id=1&name=Co
 * ```
 */

export function joinUrlParams<T extends {[s:string]: any} >(url:string, obj:T):string{
  if(!obj){return url }
  return Object.entries({...obj}).reduce(( acc, [ key, value ], index ) => `${acc}${ index ? '&' : '?' }${key}=${value}`, url )
}   