/**
 * 对象过滤器
 * @packageDocumentation
 * @module vx-tools/objectFilter
 */

/**
 * 对象过滤器
 * @summary
 * 通过关键字列表，抽取对象对应字段值，生成新的对象.
 * 只做浅层映射
 * @example
 * ``` ts
 * const source = {
 *   id: 12,
 *   name: 'coco',
 *   job: 'IT'
 * }
 * const keys = ['name', 'job']
 * const target = objectFilter(keys, source) 
 * => { name: 'coco', job: 'IT' }
 * ```
 */

export function objectFilter<T extends {[key:number]: any}, U extends keyof T>(keys: U[], source:T):{[key in U]:any}
export function objectFilter<T extends {[key:string]: any}, U extends keyof T>(keys: U[], source:T):{[key in U]:any} {
  return keys.reduce((acc, next: keyof T) => {
    return {
      ...acc,
      [next]: source[next]
    }
  }, {} as T)
}
