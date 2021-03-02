/**
 * 防抖
 * @packageDocumentation
 * @module vx-hooks/useBool
 */
import { ref } from 'vue'

/**
 * useDebounceFn API
 */
export interface useDebounceFnAPI {
  /** 触发延时回调 */
  run: (...args: any) => void;
  /** 取消回调 */
  cancel: () => void;
}

/**
 * 防抖
 * @param fn 回调函数 
 * @param wait 延时时常(s)
 * 
 * @example
 * ``` ts
 * 
 * const submit = async() => { console.log('onsubmit') }
 * const { run, cancel } = useDebounceFn(submit, 1)
 * 
 * run()
 * run()
 * run()
 * 
 * // delay 1s
 * => onsubmit
 * 
 * ```
 * 
 */
export function useDebounceFn<T extends (...args:any) => any>(fn: T, wait: number = 1): useDebounceFnAPI {
  const timer = ref<any>()

  const cancel = () => {
    timer.value && clearTimeout(timer.value)
  }

  const run = (...args:any) => {
    cancel()
    timer.value = setTimeout(() => fn.apply(fn, args), wait * 1000)
  }

  return {
    run,
    cancel
  }
}