import {
  computed,
  ref,
} from 'vue'
import {
  useBool
} from '../useBool/index'

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type MouseWheelDirectionY = 'up' | 'down' | 'unchange'
export type MouseWheelDirectionX = 'left' | 'right' | 'unchange'
export type MouseWheelDirectionZ = 'out' | 'in' | 'unchange'
export type MouseWheelType = 'px' | 'line' | 'page' | 'undefined'
export function MouseWheelTypeMap(n: number): MouseWheelType {
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

const buildCheck = (u: string, d: string, c: string) => (n: number) => {
  if (n < 0) {
    return u
  }
  if (n > 0) {
    return d
  }
  return c
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

export function useMousewheel() {
  const wheelEvent = ref<WheelEvent>({
    deltaY: 0,
    deltaX: 0,
    deltaZ: 0,
    deltaMode: 0
  } as WheelEvent)

  const wheelType = computed(() => MouseWheelTypeMap(wheelEvent.value.deltaMode))
  const directionY = computed(() => buildCheck('up', 'down', 'unchange')(wheelEvent.value.deltaY))
  const directionX = computed(() => buildCheck('left', 'right', 'unchange')(wheelEvent.value.deltaX))
  const directionZ = computed(() => buildCheck('out', 'in', 'unchange')(wheelEvent.value.deltaZ))

  const { state: disabled, setTrue: unUse, setFalse: canUse } = useBool()

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
