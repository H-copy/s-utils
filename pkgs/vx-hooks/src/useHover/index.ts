/**
 * 鼠标悬停
 * @packageDocumentation
 * @module vx-hooks/useHover
 */

import {
  ref,
  watch,
  Ref
} from 'vue'

import { useBool } from '../useBool'

/**
 * useHover API
 */
export interface UseHoverAPI{
  /** 绑定元素 */
  target: Ref<HTMLElement | undefined>;
  /** 鼠标是否悬停中 */
  hoverStatus: Ref<boolean>;
  /** 重绑定 */
  addEvent: () => void;
  /** 取消绑定 */
  cancelEvent: () => void;
}

/**
 * useHover options
 */
export interface UseHoverOptions {
  /** 绑定元素 */
  target?: Ref<HTMLElement>
  /** 鼠标滑入回调 */
  onEnter?: (e?: MouseEvent) => void
  /** 鼠标滑出回调 */
  onLeave?: (e?: MouseEvent) => void
}

/**
 * 鼠标悬停
 * @param options 配置项目
 * @example
 * ```typescript
 * 
 * <div id='area' ref='target'> {{ hoverStatus }} </div>
 * <button @click='addEvent'> {{ addEvent }} </button>
 * <button @click='cancelEvent'> {{ cancelEvent }} </button>
 * 
 * setup() {
 *    const count = ref(0)
 *    const onEnter = () => {
 *      count.value += 1
 *    }
 *    const onLeave = () => {
 *      count.value -= 1
 *    }
 *    const { target, hoverStatus, addEvent, cancelEvent} = useHover({ onEnter, onLeave })
 * 
 *    return {
 *      count,
 *      target,
 *      hoverStatus,
 *      addEvent,
 *      cancelEvent
 *    }
 *  }
 * 
 *  target.trigger('mouseenter') // count: 1 hoverStatus: true
 *  target.trigger('mouseleave') // count: 0 hoverStatus: false
 * 
 *  cancelEvent()
 *  target.trigger('mouseenter') // count: 0 hoverStatus: false
 * 
 *  addEvent()
 *  target.trigger('mouseenter') // count: 1 hoverStatus: true
 * 
 * ```
 */
export function useHover(options: UseHoverOptions = {}):UseHoverAPI {

  const { onEnter, onLeave } = options
  const target:Ref<HTMLElement | undefined> = options.target ? options.target : ref<HTMLElement | undefined>()
  const _watchStop = ref<any>()

  const { state: hoverStatus, setTrue: enter, setFalse: leave } = useBool()

  const onMouseEnter = (e: MouseEvent) => {
    enter()
    onEnter && onEnter(e)
  }

  const onMouseLeave = (e: MouseEvent) => {
    leave()
    onLeave && onLeave(e)
  }

  const addEvent = () => {
    setWatch()
    if (!target.value) {
      return
    }

    target.value.addEventListener('mouseenter', onMouseEnter)
    target.value.addEventListener('mouseleave', onMouseLeave)
  }

  const cancelEvent = () => {
    
    if (_watchStop.value) {
      _watchStop.value()
    }
    
    if (!target.value) {
      return
    }

    target.value.removeEventListener('mouseenter', onMouseEnter)
    target.value.removeEventListener('mouseleave', onMouseLeave)
  }

  function setWatch() {
    _watchStop.value = watch(target, (val, oldVal) => {
      if (oldVal) {
        oldVal.removeEventListener('mouseenter', onMouseEnter);
        oldVal.removeEventListener('mouseleave', onMouseLeave);
      }
  
      if (val) {
        val.addEventListener('mouseenter', onMouseEnter);
        val.addEventListener('mouseleave', onMouseLeave);
      }
    }, { immediate: true })
  }
  
  addEvent()

  return {
    target,
    hoverStatus,
    addEvent,
    cancelEvent,
  }

}