/**
 * localStorage 缓存 
 * @packageDocumentation
 * @module vx-hooks/useLocalStorageState
 */
import { useStorageState, UseStorageStateAPI } from '../useStrongeState'

/**
 * localStorage 缓存
 * @summary
 * useStorageState 的localStorage柯里化, 
 * 具体使用查看 useStorageState
 * @param key 缓存字段
 * @param defaultValue 初始时缓存为空值时，返回的默认值 
 */
export function useLocalStorageState<T>(key: string, defaultValue?: T | (() => T)): UseStorageStateAPI<T>{
  return useStorageState(localStorage, key, defaultValue)
}