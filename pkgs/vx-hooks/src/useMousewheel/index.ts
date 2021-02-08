/**
 * 鼠标滚动
 * @packageDocumentation
 * @module vx-hooks/useMousewheel
 */

import {
  computed,
  ref,
  ComputedRef,
  Ref,
} from 'vue'

/* eslint-disable  @typescript-eslint/no-explicit-any */

/** Y轴方向  */
export type MouseWheelDirectionY = 'up' | 'down' | 'unchange'
/** X轴方向  */
export type MouseWheelDirectionX = 'left' | 'right' | 'unchange'
/** Z轴方向  */
export type MouseWheelDirectionZ = 'out' | 'in' | 'unchange'
/** 值单位类型  */
export type MouseWheelType = 'px' | 'line' | 'page' | 'undefined'

/**
 * 滚轮事件值单位类型断言
 * @param n 类型值
 * @returns 
 * 类型名称
 */
export function mouseWheelTypeMap(n: number): MouseWheelType {
  switch (n) {
    case 0:
      return 'px'
    case 1:
      return 'line'
    case 2:
      return 'page'
    default:
      return 'undefined'
  }
}

const buildCheck = <T extends string>(u: string, d: string, c: string) => (n: number) => {
  if (n < 0) {
    return u as T
  }
  if (n > 0) {
    return d as T
  }
  return c as T
}

const TYPES = [
  'up',
  'down',
  'left',
  'right',
  'out',
  'in',
  'unchange',
]

const typeCheck = (s: string, t?: string) => {
  if (t) {
    return TYPES.includes(s) && s === t
  }
  return TYPES.includes(s)
}

const isUp = (s: string) => typeCheck(s, 'up')
const isDown = (s: string) => typeCheck(s, 'down')
const isLeft = (s: string) => typeCheck(s, 'left')
const isRight = (s: string) => typeCheck(s, 'right')
const isOut = (s: string) => typeCheck(s, 'out')
const isIn = (s: string) => typeCheck(s, 'in')
const isUnchange = (s: string) => typeCheck(s, 'unchange')

/**
 * 鼠标滚轮 hook 返回 API 
 * 
 * ### 方向断言
 * - isUp(s: string)  
 * - isDown(s: string)
 * - isLeft(s: string)
 * - isRight(s: string)
 * - isOut(s: string)
 * - isIn(s: string)
 * - isUnchange(s: string)
 * - typeCheck(s: string, t?: string)
 * 
 * ### 方向
 * - directionY
 * - directionX
 * - directionZ
 * 
 * ### 开关
 * - disabeld 是否可用
 * - canUse()
 * - unUse()
 * 
 * ### 事件
 * - onMousewheel()
 */
export interface UseMousewheelAPI{
  isUp: (s: string) => boolean
  isDown: (s: string) => boolean
  isLeft: (s: string) => boolean
  isRight: (s: string) => boolean
  isOut: (s: string) => boolean
  isIn: (s: string) => boolean
  isUnchange: (s: string) => boolean
  canUse: () => void
  unUse: () => void
  onMousewheel: (e: WheelEvent) => void
  typeCheck: (s: string, t?: string) => boolean
  wheelEvent: Ref<WheelEvent>
  disabled: Ref<boolean>
  wheelType: ComputedRef<MouseWheelType>
  directionY: ComputedRef<MouseWheelDirectionY>
  directionX: ComputedRef<MouseWheelDirectionX>
  directionZ: ComputedRef<MouseWheelDirectionZ>
}

/**
 * 鼠标滚轮hook
 * @example
 * ``` ts
 * <template>
 *    <input 
 *    v-model='value' 
 *    @foucs='canUse'
 *    @blur='unUse'
 *    @mousewheel='onMousewheel' />
 *  </template>
 *  <script>
 *
 *  export default {
 *    setup(){
 *      const {
 *        isUp,
 *        isDown,
 *        directionY,
 *        wheelEvent,
 *        unUse,
 *        canUse,
 *        onMousewheel,
 *      }
 *      const count = ref(0)
 *      
 *      watch(wheelEvent, () => { *
 *        if(isUp(directionY.value)){
 *          count.value -= 1
 *        } *
 *        if(isDown(directionY.value)){
 *          count.value += 1
 *        }
 *        
 *      })
 *      
 *      return {
 *        onMousewheel,
 *        unUse,
 *        canUse,
 *      }
 *    }
 *  }
 * ```
 */
export function useMousewheel(): UseMousewheelAPI {
  const wheelEvent = ref({
    deltaY: 0,
    deltaX: 0,
    deltaZ: 0,
    deltaMode: 0
  } as WheelEvent)

  const wheelType = computed(() => mouseWheelTypeMap(wheelEvent.value.deltaMode))
  const directionY = computed(() => buildCheck<MouseWheelDirectionY>('up', 'down', 'unchange')(wheelEvent.value.deltaY))
  const directionX = computed(() => buildCheck<MouseWheelDirectionX>('left', 'right', 'unchange')(wheelEvent.value.deltaX))
  const directionZ = computed(() => buildCheck<MouseWheelDirectionZ>('out', 'in', 'unchange')(wheelEvent.value.deltaZ))

  const disabled = ref(false)
  const unUse = () => { disabled.value = true }
  const canUse = () => { disabled.value = false }

  const onMousewheel = (e: WheelEvent) => {
    if (disabled.value) {
      return
    }
    wheelEvent.value = e
  }
  
  return {
    isUp,
    isDown,
    isLeft,
    isRight,
    isOut,
    isIn,
    isUnchange,
    wheelType,
    wheelEvent,

    directionY,
    directionX,
    directionZ,

    onMousewheel,
    typeCheck,

    disabled,
    unUse,
    canUse
  }
}
