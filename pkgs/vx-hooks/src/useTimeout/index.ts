
import { ref, Ref } from 'vue'
import { useBool } from '../useBool'

const SECOND = 1000
export type Fn = (...args: any[]) => any


/**
 * useTimeLoop API
 */
export interface useTimeLoopAPI {
  /** 开启定时器 */
  run: (...args: any[]) => void
  /** 终止定时器 */
  stop: () => void
  /** 是否运行中 */
  isRun: Ref<boolean>
  /** 修改执行回调 */
  setCallback: (callback: Fn) => Fn
}

/**
 * 定时执行器 interval hook
 * 
 * @summary 
 * 通过 setInterval 实现的轮询定时器
 * 
 * @param callback - 回调 
 * @param t - 时间间隔(s)
 */
export function useTimeLoop(callback: Fn, t = 0): useTimeLoopAPI {

  const { state: isRun, setTrue, setFalse } = useBool()
  const time = ref()
  const cb = ref(callback)

  const stop = () => {
    time.value && clearInterval(time.value)
    setFalse()
    time.value = undefined
  }

  const run = (...args: any[]) => {
    stop()
    setTrue()
    time.value = setInterval(cb.value, t * SECOND, ...args)
  }

  const setCallback = (callback: Fn) => cb.value = callback

  return { run, stop, isRun, setCallback }
}


/**
 * useTime APi
 */
export interface UseTimeoutAPI {
  /** 启动定时器 */
  run: (...args: any[]) => void
  /** 终止定时器 */
  stop: () => void
  /** 是否运行中 */
  isRun: Ref<boolean>
  /** 设置执行回调 */
  setCallback: (callback: Fn) => Fn
}


/**
 * 定时器 timeout
 * @summary
 * 使用 timeout 实现的定时器，兼容Promise回调，
 * 当回调返回Promise时，将等待Promise执行完成后，
 * 出入下一次计时
 * @param callback - (function | Promise) 执行回调
 * @param t - 时间间隔(s)
 * 
 * @exmaple
 * ``` ts
 * const { run, stop, isRun } = useTimeout()
 * async function update(){
 *   try{
 *      await API.update()  
 *   }catch(e){
 *      console.error(e)
 *      stop()
 *   }
 * }
 * 
 * ```
 * 
 * @tips
 * 中断处理:
 * > 对于callback为Promise的情况, callback内执行stop。
 *  存在clearTimeout无法中断循环的情况, 主要因为clearTimeout清理的是timeout的执行,
 *  必须在回调执行前。
 *  所以 run 循环需要通过 isRun 判断是否执行下一计时器. 
 *  统一将中断封装为 stop 函数
 * 
 */
export function useTimeout(callback: Fn, t = 0): UseTimeoutAPI {
  const { state: isRun, setTrue, setFalse } = useBool()
  const time = ref()
  const cb = ref(callback)

  const stop = () => {
    time.value && clearTimeout(time.value)
    setFalse()
  }

  const run = (...args: any[]) => {
    setTrue()
    time.value = setTimeout(async () => {
      await callback(...args)
      isRun.value && run()
    }, t * SECOND)
  }

  const setCallback = (callback: Fn) => cb.value = callback

  return { run, stop, isRun, setCallback }
}
