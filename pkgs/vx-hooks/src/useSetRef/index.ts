/**
 * 仿 react ref
 * @packageDocumentation
 * @module vx-hooks/useSetRef
 */

import { ref, Ref } from 'vue'

/**
 * useSetRef API
 * @typeParam T 缓存值类型
 */
export interface UseSetRefAPI<T>{
  /** 缓存值 */
  state: Ref<T>;
  /** 值设置 */
  setState: (data: T) => void;
}

/**
 * 仿 react ref
 * @param initVal T 初始值
 * @typeParam T 值类型
 * @example
 * ```ts
 * 
 * const { state, setState } = useSetRef(0)
 * setState(10)
 * 
 * console.log(state.value)
 * => 10
 * 
 * ```
 */
export function useSetRef<T>(initVal:T):UseSetRefAPI<T>{
  const state = ref(initVal) as Ref<T>
  const setState = (data: T) => {
    state.value = data
  }
    
  return {state, setState}
}