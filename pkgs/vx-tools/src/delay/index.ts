/**
 * 延时器
 * @author copy-left
 * @summary
 * 通过promise 将函数推入任务队列，延时执行
 */
export function delay<T = any>(time:number, cb?:() => T):Promise<T | null> {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove(cb ? cb() : null)
    }, time * 1000)
  })
}
