/**
 * strong 本地缓存
 * @packageDocumentation
 * @module vx-hooks/UseStorageStateAPI
 */

import { ref, Ref } from 'vue'


function getStorageValue<T>(storage: Storage, key: string, defaultValue?: T | (() => T)):(T | undefined) {
  const raw = storage.getItem(key)

  if (raw) {
    return JSON.parse(raw)
  }

  if(typeof defaultValue === 'function'){
    return (defaultValue as () => T)() 
  }

  return defaultValue
}

/**
 * UseStrongState API
 */
export interface UseStorageStateAPI<T>{
  /** 缓存值 */
  state: Ref<T | undefined>;
  /** 更新函数 */
  update: (value?: T) => void;
}


/**
 * strong 本地缓存
 * @param storage 缓存类型  sessionStorage | localStorage
 * @param key 缓存字段
 * @param defaultValue 初始时，字段为空时的默认值
 * @example
 * ```typescript
 * 
 * sessionStorage.setItem('data', 10)
 * const { state, update } = useStorageState(sessionStorage, 'data', 20)
 * console.log(state.value) // 10
 * update(40)
 * console.log(state.value, sessionStorage) // undefined
 * update()
 * console.log(state.value, sessionStorage) // undefined
 * 
 * ``` 
 */
export function useStorageState<T>(storage: Storage, key: string, defaultValue?: T | (() => T)) {
  const state = ref(getStorageValue(storage, key, defaultValue)) as Ref<T | undefined>

  function update(value?: T) {
    if (typeof value === 'undefined') {
      storage.removeItem(key)
      state.value = undefined
      return
    }

    if (typeof value === 'function') {
      const previousState = getStorageValue(storage, key)
      const currentState = value(previousState)
      storage.setItem(key, JSON.stringify(currentState))
      state.value = currentState
      return
    }

    storage.setItem(key, JSON.stringify(value))
    state.value = value
  }

  update(state.value)

  return { state, update }
}
