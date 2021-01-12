import { ref, Ref } from 'vue'


/**
 * @name Map类型hook
 * @param { Array } initVal 初始Map配置
 * 
 * @returns { Object } 
 * - map Map容器
 * - get 获取值
 * - set 设置值
 * - setAll 重设Map值
 * - remove 移除值
 * - reset 将值还原为初始值
 * - resetInit 重设初始值
 */
export function useMap<T, U>(initVal:Iterable<readonly [T, U]> = []): {
  map: Ref<Map<T, U>>;
  get: (key: T) => U | undefined;
  set: (key: T, val: U) => void;
  setAll: (newMap: Iterable<readonly [T, U]>) => void;
  remove: (key: T) => void;
  reset: () => Map<T, U>;
  resetInit: (newMap: Iterable<readonly [T, U]>) => any;
} {

  const initMap:Ref<Map<T, U>> = ref(new Map(initVal))
  const map:Ref<Map<T, U>> = ref(new Map(initVal))
  
  const get = (key:T) => map.value.get(key)

  const set = (key:T, val:U) => {
	  //先使用原map设置值,覆盖已有key和无key的情况
	  map.value.set(key, val)

	  //immutable
	  map.value = new Map([...map.value])
  }

  const setAll = (newMap:Iterable<readonly [T, U]>) => {
    map.value = new Map(newMap)
  }

  const remove = (key:T) => {
	  map.value.delete(key);
	  map.value = new Map([...map.value])
  }

  const reset = () => map.value = new Map([...initMap.value])
  const resetInit = (newMap:Iterable<readonly [T, U]>) => initMap.value = new Map(newMap)

  return { map, get, set, setAll, remove, reset, resetInit }
  
}