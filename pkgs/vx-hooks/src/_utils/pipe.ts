/** @internal */

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
export const pipe = (...fns: Function[]) => (arg?: any) => fns.reduce((acc, fn) => fn(acc), arg)
