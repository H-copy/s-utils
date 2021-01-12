import { ref, Ref } from 'vue'

/**
 * 布尔值切换
 * @param { boolean } initStatus 初始值
 * @returns { object }
 *  - state 当前状态
 *  - setTrue 设为true
 *  - setFalse 设置false
 *  - toggle 状态切换
 */
export function useBool(initStatus = false):{
  state: Ref<boolean>;
  setTrue: () => void;
  setFalse: () => void;
  toggle: (value?: boolean | undefined) => void;
}{
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
