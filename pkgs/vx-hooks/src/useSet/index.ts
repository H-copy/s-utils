/**
 * Set 类型操作
 * @packageDocumentation
 * @module vx-hooks/useSet
 */

import { ref, Ref } from 'vue'

/**
 * useSet API
 * 
 * - set Set容器
 * - add 添加项
 * - remove 移除项
 * - reset 重置
 * - setInit 设置初始值
 * - update 更新 Set容器以及初始值
 */
export interface UseSetAPI<T>{
  set: Ref<Set<T>>
  add: (val: T) => Set<T>
  remove: (val: T) => Set<T>
  reset: () => Set<T>
  setInit: (initVal: Iterable<T>) => Set<T>
  update: (initVal: Iterable<T>) => void
}

/**
 * Set 类型 hooks
 * 
 * @param initVal - 初始数据
 * @summary 
 * 对Set类型做的hook封装，利用Set的幂等性
 * 
 * @exports
 * 
 * ``` ts
 * const [ set, utils ] = useSet([ 1, 2 ])
 * 
 * 添加
 * set.add(3) ==> [1, 2, 3]
 * set.add(2) ==> [1, 2, 3]
 * 
 * 移除
 * set.remove(1) ==> [2, 3]
 * 
 * 重置
 * set.reset()  ==> [1, 2]
 * 
 * 
 * 其他Set方法
 * 
 * 校验
 * set.value.has(1) ==> true
 * 
 * 遍历
 * const newList = [...set.value].map(num => num + 1)  ==> [ 2, 3 ]
 * 
 * ```
 */
export function useSet<T>(initVal:Iterable<T> = []): UseSetAPI<T>{

  const initSet:Ref<Set<T>> = ref(new Set(initVal))
  const set:Ref<Set<T>> = ref(new Set(initVal))
  
  const add = (val:T) => set.value = new Set([...[...set.value], val])
  const remove = (val:T) => set.value = new Set([...set.value].filter(i => i !== val))
  const reset = () => set.value = new Set([...initSet.value])
  const setInit = (initVal:Iterable<T>) => initSet.value = new Set(initVal)
  const update = (initVal:Iterable<T>) =>{ setInit(initVal); reset() }
  
  return { set, add, remove, reset, setInit, update }
}
