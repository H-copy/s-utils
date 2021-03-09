/**
 * 元素外点击
 * @packageDocumentation
 * @module vx-hooks/useClickAway
 */

import {
  ref,
  onBeforeUnmount,
  Ref
} from 'vue'

import { BaseTarget, getTargetElement } from '../_utils'

/**
 * useClickAway API
 */
export interface UseClickAwayAPI {
  /** 当前监听元素 */
  target: Ref<BaseTarget | BaseTarget[]>
  /** 启动监听 */
  addEvent: () => void
  /** 取消监听 */
  cancelEvent: () => void
  /** 重新设置 */
  reset: (onClickAway?: ((evn: MouseEvent) => void) | undefined, type?: string | undefined) => void
}

/**
 * 元素外点击
 * @param onClickAway 事件回调
 * @param dom 观察元素
 * @param type { click } 事件类型
 * @example
 * ```typescript
 * 
 *  <template>
 *    <div id='left' ref='target'></div>
 *    <div id='right'></div>
 *  </template>
 *  
 *  setup(){
 *    const count = ref(0)
 *    const { target, addEvent, cancelEvent, reset } = useClickAway(() => { count.value += 1 })
 *    return { target }
 *  }
 * 
 * left.trigger('click')
 * count => 0
 * right.trigger('click')
 * count => 1
 * 
 * // 取消 document 监听
 * cancelEvent()
 * right.trigger('click')
 * right.trigger('click')
 * count => 1
 * 
 * // 回复 document 监听
 * addEvent()
 * right.trigger('click')
 * count => 2
 * 
 * // 重置回调
 * const newCb = () => console.log('hidden !!!')
 * reset(newCb, 'click')
 * 
 * ```
 */
export function useClickAway(
  onClickAway: (evn: MouseEvent) => void,
  dom?: Ref<BaseTarget | BaseTarget[]>,
  type = 'click'
): UseClickAwayAPI {
  const _type = ref(type)
  const _onClickAway = ref(onClickAway)

  const target = dom ? dom : ref(null) as Ref<BaseTarget | BaseTarget[]>

  const handler = (event: any) => {
    const _targets = Array.isArray(target.value) ? target.value : [target.value] 
    const pass = !_targets.some(_target => {
      const ele = getTargetElement(_target) as HTMLElement
      return !ele || ele?.contains(event.target)
    })
    pass && _onClickAway.value(event)
  }

  const addEvent = () => { document.addEventListener(_type.value, handler) }
  const cancelEvent = () => { document.removeEventListener(_type.value, handler) }
  const reset = (onClickAway?: (evn: MouseEvent) => void, type?: string) => {
    cancelEvent()
    if (onClickAway) {
      _onClickAway.value = onClickAway
    }

    if (type) {
      _type.value = type
    }
    addEvent()
  }
  
  onBeforeUnmount(() => cancelEvent())
  addEvent()

  return { target, addEvent, cancelEvent, reset }
}