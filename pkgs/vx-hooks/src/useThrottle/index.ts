/**
 * 节流值
 * @packageDocumentation
 * @module vx-hooks/useThrottle
 */
import { ref, watch, Ref, ComputedRef, WatchStopHandle } from 'vue'
import { useThrottleFn } from '../useThrottleFn' 

/**
 * useThrottle API
 */
export interface UseThrottleAPI<T>{
  /** 延时值 */
  state: Ref<T>;
  /** 延时值设置函数 */
  setState: (...args: any) => void;
  /** 取消一次设值 */
  cancel: () => void;
  /** 中断值监听 */
  watchStop: WatchStopHandle;
}


/**
 * 节流值
 * @summary
 * 使用节流函数更新对应响应值, 时间间隔将小于配置时间  时间间隔 => 等待时间 - 0.01s
 * @param watchFn 监听对象
 * @param wait { 1 } 延时时常(s)
 * @typeParam T 监听值类型
 * @example
 * ```ts
 * 
 * const watchVal = ref(0)
 * const { state } = useThrottle(watchVal, 2)
 * 
 * watchval.value = 1
 * // dely 1
 * watchval.value = 2
 * watchval.value = 3
 * watchval.value = 4
 * // dely 1
 * console.log(state.value)
 * => 1
 * 
 * ```
 */
export function useThrottle<T>(watchFn: (() => T)| Ref<T> | ComputedRef<T>, wait = 1): UseThrottleAPI<T> {

  const state = typeof watchFn === 'function' ?  ref(watchFn()) as Ref<T> : ref(watchFn.value) as Ref<T>
  const { run: setState, cancel } = useThrottleFn((data: T) => {state.value = data}, wait - 0.01)
  const watchStop = watch(watchFn, (newVal) => setState(newVal))
    
  return { state, setState, cancel, watchStop }
}