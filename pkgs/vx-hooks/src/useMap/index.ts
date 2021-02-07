import { ref, Ref } from 'vue'

/**
 * useMap API
 * - map Map容器
 * - get 获取值
 * - set 设置值
 * - setAll 重设Map值
 * - remove 移除值
 * - reset 将值还原为初始值
 * - resetInit 重设初始值
 */
export interface UseMapAPI<T, U> {
  map: Ref<Map<T, U>>;
  get: (key: T) => U | undefined;
  set: (key: T, val: U) => void;
  setAll: (newMap: Iterable<readonly [T, U]>) => void;
  remove: (key: T) => void;
  reset: () => Map<T, U>;
  resetInit: (newMap: Iterable<readonly [T, U]>) => any;
}

/**
 * Map类型 hook
 * @param initVal - 初始Map配置
 * @typeParam T - map key 类型
 * @typeParam U - map value 类型
 * 
 * @example
 * ``` ts
 * <template>
 *   <div class="home">
 *     <div>
 *         <input v-model='newName' />
 *         <button @click='add'>
 *             add
 *       </button>
 *       <ul>
 *           <li v-for='name of names' :key='name' @click='remove(name)' > 
 *                 {{ name }} 	
 *         </li>    
 *       </ul>
 *     </div>
 *   </div>
 * </template>
 * <script>
 * import { ref, computed } from 'vue'
 * import { useMap } from 'vx-hook'
 * export default {
 *   setup(){
 *     const newName = ref('')
 *     const { map, get, set, remove } = useMap([
 *       [ 'Rogen', 1 ],  
 *       [ 'Coco', 2 ],
 *       [ 'Jim', 3 ]
 *     ])
 *     const names = computed(() => [ ...map.keys() ])
 *     const add = () => set(newName, names.value.length)
 *       
 *     return {
 *       newName,
 *       names,
 *       remove
 *     }
 *   }
 * }
 * </script>
 * ```
 */
export function useMap<T, U>(initVal: Iterable<readonly [T, U]> = []): UseMapAPI<T, U> {

  const initMap: Ref<Map<T, U>> = ref(new Map(initVal))
  const map: Ref<Map<T, U>> = ref(new Map(initVal))

  const get = (key: T) => map.value.get(key)

  const set = (key: T, val: U) => {
    //先使用原map设置值,覆盖已有key和无key的情况
    map.value.set(key, val)

    //immutable
    map.value = new Map([...map.value])
  }

  const setAll = (newMap: Iterable<readonly [T, U]>) => {
    map.value = new Map(newMap)
  }

  const remove = (key: T) => {
    map.value.delete(key);
    map.value = new Map([...map.value])
  }

  const reset = () => map.value = new Map([...initMap.value])
  const resetInit = (newMap: Iterable<readonly [T, U]>) => initMap.value = new Map(newMap)

  return { map, get, set, setAll, remove, reset, resetInit }

}