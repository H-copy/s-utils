/**
 * 防抖值
 * @packageDocumentation
 * @module vx-hooks/useBool
 */
import { ref, watch, Ref, ComputedRef, WatchStopHandle } from 'vue'
import { useDebounceFn } from '../useDebounceFn'


/**
 * useDebounceAPI
 * @typeParam T 值类型
 */
export interface useDebounceAPI<T>{
  /** 延时值 */
  state: Ref<T>;
  /** 中断设值监听 */
  watchStop: WatchStopHandle;
  /** 取消一次设值 */
  cancel: () => void;
}

/**
 * 防抖值
 * @summary
 * 通过监听观察对象的变化，延时修改目标值
 * @tips
 * 1. 因为使用了 watch，所以只在观察对象值变化时，触发更新
 * 2. 内部对 wait 缩短的 0.01s, 因为回调触发是在延时时间结束后，如果我们
 * 配合在 async await 中使用，我们直接配置 wait 作为间隔时间，将无法观察到
 * 值的变化.
 * @param watchFn watch 被监听函数 / 取值函数
 * @param wait { 1 } 延时时常(s)
 * 
 * @example
 * ``` ts
 * 
 * const watchVal = ref(0)
 * const { state, watchStop, cancel } = useDebounce(watchVal)
 * 
 * watchval.value = 1
 * watchval.value = 2
 * watchval.value = 3
 * 
 * console.log(state.value) // 0
 * 
 * // 延时更新
 * // delay 1s
 * console.log(state.value) // 3
 * 
 * 
 * // 取消某次赋值
 * watchval.value = 4
 * cancel()
 * 
 * //delay 1s
 * console.log(state.value) // 3
 * watchval.value = 4
 * //delay 1s
 * console.log(state.value) // 4
 * 
 * 
 * // 中断监听
 * watchStop()
 * watchval.value = 5
 * // delay 2s
 * console.log(state.value) // 4
 * 
 * ```
 */
export function useDebounce<T>(watchFn: (() => T) | Ref<T> | ComputedRef<T>, wait: number = 1): useDebounceAPI<T> {
  const state = typeof watchFn === 'function' ?  ref(watchFn()) as Ref<T> : ref(watchFn.value) as Ref<T>

  const { run: setState, cancel } = useDebounceFn((d: T) => state.value = d, wait - 0.01)
  const watchStop = watch(watchFn, (newVal) => {
    setState(newVal)
  })
  return { state, watchStop, cancel }
}