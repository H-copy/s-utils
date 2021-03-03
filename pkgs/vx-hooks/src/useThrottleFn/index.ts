/**
 * 节流
 * @packageDocumentation
 * @module vx-hooks/useThrottleFn
 */
import { ref } from 'vue'

/**
 * useThrottleFn API
 */
export interface UseThrottleFnAPI {
  /** 调起回调 */
  run: (...args: any) => void;
  /** 取消回调执行 */
  cancel: () => void;
}

/**
 * 节流
 * @param fn 回调 
 * @param wait { 1 } 延时间隔(s)
 * @typeParam T 回调函数类型
 * @example
 * ``` ts
 * const cb = (d) => console.log(d)
 * const { run, cancel } = useThrottleFn(cb, 1)
 * 
 * run(1)
 * // dely 1s
 * 
 * run(2)
 * run(3)
 * 
 * => 1
 * 
 * ```
 */
export function useThrottleFn<T extends (...args: any) => any>(fn: T, wait = 1):UseThrottleFnAPI {

  const timer = ref<any>(null)
  const cleanTimer = () => {
    clearTimeout(timer.value)
    timer.value = null
  }
  
  const cancel = () => {
    timer.value && cleanTimer()
   }

  const run = (...args: any) => {
    if (timer.value) { return }
    
    timer.value = setTimeout(() => {
      cleanTimer()
      fn.apply(fn, args)
    }, wait * 1000)
  }

  return { run, cancel }
}