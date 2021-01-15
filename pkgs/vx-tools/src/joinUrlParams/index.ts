
/**
 * 拼接路由参数
 * @param { object } obj 参数对象
 * @returns { string } 
 */

export function joinUrlParams<T extends {[s:string]: any} >(url:string, obj:T):string{
  if(!obj){return url }
  return Object.entries({...obj}).reduce(( acc, [ key, value ], index ) => `${acc}${ index ? '&' : '?' }${key}=${value}`, url )
}   