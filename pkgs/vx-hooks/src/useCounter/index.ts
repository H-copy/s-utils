/**
 * 计数器
 * @packageDocumentation
 * @module vx-hooks/useCounter
 */

import { ref, computed, Ref } from 'vue'

/**
 * useCounter options
 */
export interface UseCounterOptions {
  max: number
  min: number
}

/**
 * useCounter API
 */
export interface UseCounterAPI{
  /** 当前值  */
  current: Ref<number>;
  set: (value: number) => number;
  inc: (delta?: number) => number;
  dec: (delta?: number) => number;
  reset: () => number;
}

/**
 * 计数器
 * @param initVal 初始值
 * @param options 配置属性
 * @example
 * ```js
 * 
 * const { current, set, inc, dec, reset } = useCounter(0, { max: 10, min: 1 })
 * console.log(current) // 1
 * inc()
 * console.log(current) // 2
 * 
 * inc(12)
 * console.log(current) // 10
 * 
 * dec()
 * console.log(current) // 9
 * 
 * dec(12)
 * console.log(current) // 1
 * 
 * set(4)
 * console.log(current) // 4
 * 
 * reset()
 * console.log(current) // 1
 * 
 * ```
 */

export function useCounter(initVal: number, options = {} as UseCounterOptions) {
  const { max, min } = options

  const check = (value:number) => {
    if (typeof max === 'number') {
      value = Math.min(max, value)
    }

    if (typeof min === 'number') {
      value = Math.max(min, value)
    }
    return value
  }

  // 初始校验
  const init = computed(() => check(initVal))
  const current = ref(init.value)
  const setValue = (value: number) => current.value = check(value)
  const set = setValue
  const inc = (delta = 1) => setValue(current.value + delta)
  const dec = (delta = 1) => setValue(current.value - delta)
  const reset = () => setValue(init.value)

  return { current, set, inc, dec, reset }
}