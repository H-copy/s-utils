/** @internal */
import { pipe } from './pipe'

/**
 * 柯里化
 * @param { Function } fn 被柯里化函数
 * @param { arguments } preArgs 继承参数
 * @param { arguments } args 当前参数
 * 
 * @summary 使用 function.length 获取函数期望参数格式，作为执行标记
 * @example
 * const add = (a, b) => a + b
 * const addOne = curry(add)(1)
 * addOne(10) ==> 11
 * addOne(11) ==> 12
 * 
 */
export const curry = <T extends Function>(fn: T, preArgs = [] as any[]) => (...args: any) => {
  return pipe(
    () => [[...preArgs, ...args], fn], // 初始调用时, preArgs 设置默认值，保证数组的正常结构
    ([data, fn]: any[]) => data.length === fn.length ? fn(...data) : curry(fn, data)
  )()
}

