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
export interface useThrottleAPI<T>{
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
 * @param watchFn 监听对象
 * @param wait { 1 } 延时时常(s)
 * @typeParam T 监听值类型
 */
export function useThrottle<T>(watchFn: (() => T)| Ref<T> | ComputedRef<T>, wait = 1): useThrottleAPI<T> {

  const state = typeof watchFn === 'function' ?  ref(watchFn()) as Ref<T> : ref(watchFn.value) as Ref<T>
  const { run: setState, cancel } = useThrottleFn((data: T) => {state.value = data}, wait - 0.01)
  const watchStop = watch(watchFn, (newVal) => setState(newVal))
    
  return { state, setState, cancel, watchStop }
}