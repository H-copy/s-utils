import { ref, watch, Ref, ComputedRef, WatchStopHandle } from 'vue'
import { useDebounceFn } from '../useDebounceFn'

export function useDebounce<T>(watchFn: (() => T) | Ref<T> | ComputedRef<T>, wait: number): {
  state: Ref<T>;
  watchStop: WatchStopHandle;
  cancel: () => void;
} {
  const state = typeof watchFn === 'function' ?  ref(watchFn()) as Ref<T> : ref(watchFn.value) as Ref<T>

  const { run: setState, cancel } = useDebounceFn((d: T) => state.value = d, wait)
  const watchStop = watch(watchFn, (newVal) => {
    setState(newVal)
  })
  return { state, watchStop, cancel }
}