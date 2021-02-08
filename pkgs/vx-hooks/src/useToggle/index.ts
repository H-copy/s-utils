/**
 * 左右值切换
 * @packageDocumentation
 * @module vx-hooks/useToggle
 */
import {
  ref,
  computed,
  Ref
} from 'vue'
/**
 * useToggle API
 * @typeParam T - 左值类型
 * @typeParam U - 右值类型
 */
export interface UseToggleAPI<T, U> {
  /** 当前状态值 */
  state: Ref<boolean | T | U>
  /** 状态切换 */
  toggle: (value?: boolean | T | U | undefined) => void
  /** 设置左值 */
  setLeft: () => void
  /** 设置右值 */
  setRight: () => void
}

/**
 * 转换hook
 * @param { any } initStatus 初始值 
 * @param { any } reverseValue 切换值 
 * @typeParam T - 左值类型
 * @typeParam U - 右值类型
 * @example
 * ``` ts
 * const { currentStatus, toggle, setLeft as open, setRight as close } = useToggle('open', 'close')
 * 
 *  模板
 *  <div>
 * 
 *      <h1> {{ currentStatus }} </h1>
 *      <button @click='toggle'> toggle </button>
 *      <button @click='open'> open </button>
 *      <button @click='close'> close </button>
 *      
 *  </div>
 *```
 */
export function useToggle<T, U>(initStatus: T | boolean = false, reverseValue: U | boolean = true): UseToggleAPI<T, U> {
  const _initStatus = initStatus === undefined ? false : initStatus
  const state = ref(_initStatus) as Ref<boolean | T | U>
  const reverseValueOrigin = computed(() => { return reverseValue === undefined ? !_initStatus : reverseValue })

  function toggle(value?: T | U | boolean) {
    if (value !== undefined) {
      state.value = value === _initStatus ? reverseValueOrigin.value : _initStatus
    }
    state.value = state.value === _initStatus ? reverseValueOrigin.value : _initStatus
  }

  const setLeft = () => { state.value = _initStatus }
  const setRight = () => { state.value = reverseValueOrigin.value }

  return {
    state,
    toggle,
    setLeft,
    setRight
  }
}
