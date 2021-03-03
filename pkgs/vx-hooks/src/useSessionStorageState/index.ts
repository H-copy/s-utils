/**
 * SessionStorage 缓存 
 * @packageDocumentation
 * @module vx-hooks/useSessionStorageState
 */
import { useStorageState, UseStorageStateAPI } from '../useStrongeState'

/**
 * sessionStorage 缓存
 * @summary
 * useStorageState sessionStorage柯里化, 
 * 具体使用查看 useStorageState
 * @param key 缓存字段
 * @param defaultValue 初始时缓存为空值时，返回的默认值 
 */
export function useSessionStorageState<T>(key: string, defaultValue?: T | (() => T)): UseStorageStateAPI<T>{
  return useStorageState(sessionStorage, key, defaultValue)
}