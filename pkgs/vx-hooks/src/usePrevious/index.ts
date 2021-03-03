/**
 * 缓存器
 * @packageDocumentation
 * @module vx-hooks/usePrevious
 */

import { ref, Ref, computed, WritableComputedRef } from 'vue'

/**
 * usePrevious API
 * @typePropm T 值类型
 */
export interface UsePreviousAPI<T>{
  /** 当前值 */
  curRef: WritableComputedRef<T>;
  /** 缓存值, 初始时为 undefined */
  prevRef: Ref<T | undefined>;
}


/**
 * 缓存器
 * @param initVal 初始值
 * @param compare 更新判断函数
 * @typePropm T 值类型
 * @example
 * ```typescript
 *  const initVal = 0
 *  const compare = (__?: number, oldVal?: number) => {
 *    console.log(oldVal, oldVal === undefined || oldVal < 10)
 *    return oldVal === undefined || oldVal < 10
 *  }
 *  const { curRef, prevRef } = usePrevious<number>(initVal, compare)
 *  console.log(curRef.value) // 0
 *  console.log(prevRef.value) // undefined
 * 
 *  const target1 = curRef.value = 5
 *  console.log(curRef.value) // 5
 *  console.log(prevRef.value) // 0
 * 
 *  const target2 = curRef.value = 12
 *  console.log(curRef.value) // 12
 *  console.log(prevRef.value) // 5 
 *  
 *  const target3 = curRef.value = 15
 *  console.log(curRef.value) // 5
 *  console.log(prevRef.value) // 12
 * 
 * ```
 */
export function usePrevious<T>(initVal: T, compare?: (val?: T, oldVal?: T) => boolean):UsePreviousAPI<T> {
  const _current = ref(initVal) as Ref<T> 

  // 如果使用 watch 测试时，watch更新将滞后。造成不发同步使用
  const curRef = computed<T>({
    get() {
      return _current.value
    },
    set(val) {
      const needUpdate = compare ? compare(val,  _current.value) : true
      if (needUpdate) {
        prevRef.value =  _current.value
      }
      _current.value = val
    }
  })
  const prevRef = ref() as Ref<T | undefined>
  
  return { curRef, prevRef }
}