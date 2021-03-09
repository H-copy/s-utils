/**
 * 获取鼠标位置信息
 * @packageDocumentation
 * @module vx-hooks/useMouse
 */

import { ref, onMounted, onUnmounted, Ref } from 'vue'

/** 鼠标位置信息 */
export interface MousePosition{
  screenX?: number;
  screenY?: number;
  clientX?: number;
  clientY?: number;
  pageX?: number;
  pageY?: number;
}

/** UseMouse API */
export interface UseMouseAPI{
  /** 鼠标位置信息 */
  state: Ref<MousePosition>
  /** 绑定mousemove事件 */
  addEvent: () => void;
  /** 解绑mousemove事件 */
  cancelEvent: () => void;
}

/**
 * 获取鼠标位置信息
 * @summary
 * 绑定 document mousemove 事件, 获取鼠标位置信息
 * @example
 * ```typescript
 *  const { state, addEvent, cancelEvent } = useMouse()
 * 
 *  // 鼠标移动，获取当前鼠标位置信息
 *  // mousemove to clientX: 10 clientY: 10
 *  // state: { clientX: 10, clientY: 10 }
 *  
 *  //解绑
 *  cancelEvent()
 * 
 *  //再次绑定
 *  addEvent() 
 * 
 * ```
 */
export function useMouse(){
  const state = ref<MousePosition>({
    screenX: undefined,
    screenY: undefined,
    clientX: undefined,
    clientY: undefined,
    pageX: undefined,
    pageY: undefined,
  })

  const moveHandler = (event: MouseEvent) => {
    const {
      screenX,
      screenY, 
      clientX, 
      clientY, 
      pageX, 
      pageY
    } = event;
    state.value = {
      screenX,
      screenY,
      clientX,
      clientY,
      pageX,
      pageY,
    }
  }

  const addEvent = () => {
    document.addEventListener('mousemove', moveHandler)
  }

  const cancelEvent = () => {
    document.removeEventListener('mousemove', moveHandler)
  }
  
  onMounted(addEvent)
  onUnmounted(cancelEvent)

  return { state, addEvent, cancelEvent }
}