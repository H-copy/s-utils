/**
 * 管道
 * @param { Function[] } fns 组合函数
 * @returns { Function } 组合后函数
 * @summary 管道执行顺序为参数传入顺序
 * @example
 * const step_1 = () => console.log('step 1')
 * const step_2 = () => console.log('step 2')
 * const run = pipe(step_1, step_2)
 * run()
 *  => step 1
 *  => step 2
 */
const pipe = (...fns:Function[]) => (arg?:any) => fns.reduce((acc, fn) => fn(acc), arg)

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
const curry = <T extends Function >(fn:T, preArgs = [] as any[]) => (...args:any) => {
    return pipe(
      () => [[...preArgs, ...args], fn], // 初始调用时, preArgs 设置默认值，保证数组的正常结构
      ([data, fn]: any[]) => data.length === fn.length ? fn(...data) : curry(fn, data)
    )()
 }


export {
  pipe,
  curry
}