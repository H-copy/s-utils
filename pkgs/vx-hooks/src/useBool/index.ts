import { ref, Ref } from 'vue'

/**
 * useBool API
 */
export interface UseBoolAPI {
  /** 当前状态 */
  state: Ref<boolean>
  /** state 设为 true */
  setTrue: () => void
  /** state 设为 fasel */
  setFalse: () => void
  /**
   * 状态切换
   * 
   * @example
   * ``` ts
   * toggle() => 当前状态的反值
   * toggle(true)
   * toggle(false)
   * ```
   */
  toggle: (value?: boolean | undefined) => void
}

/**
 * 布尔值切换
 * @param { boolean } initStatus 初始值
 * @returns { object }

 */
export function useBool(initStatus = false): UseBoolAPI{
  const state:Ref<boolean> = ref(initStatus)
  const setTrue = () => { state.value = true }
  const setFalse = () => { state.value = false }
  const toggle = (value?:boolean) => { state.value = value === undefined ? !state.value : value } 
  
  return {
    state,
    setTrue,
    setFalse,
    toggle
  }
}
