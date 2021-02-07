import {
  computed,
  ref,
  ComputedRef,
  Ref,
} from 'vue'

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type MouseWheelDirectionY = 'up' | 'down' | 'unchange'
export type MouseWheelDirectionX = 'left' | 'right' | 'unchange'
export type MouseWheelDirectionZ = 'out' | 'in' | 'unchange'
export type MouseWheelType = 'px' | 'line' | 'page' | 'undefined'

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

export function useMousewheel():{
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
} {
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
