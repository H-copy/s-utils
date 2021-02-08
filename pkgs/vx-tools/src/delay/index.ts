/**
 * 延时器
 * @packageDocumentation
 * @module vx-tools/delay
 */

/**
 * 延时器
 * @summary
 * 通过promise 将函数推入任务队列，延时执行
 * @example
 * ``` ts
 *   // 模式一
 *   // 利用 async 等待delay执行完成, 此时delay将向任务队列中插叙空函数 
 *   async function load(){
 *     // 延时获取数据
 *     
 *     await delay(2)
 *     const data = await API.getData(...)
 *     ...
 *   }
 * 
 *   // 模式二
 *   // 直接将回调函数作物，delay的延时执行函数
 *   delay(3, () => API.getData(...)).then(data => console.log('data: ', data))
 * 
 * ```
 */
export function delay<T = any>(time:number, cb?:() => T):Promise<T | null> {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove(cb ? cb() : null)
    }, time * 1000)
  })
}
