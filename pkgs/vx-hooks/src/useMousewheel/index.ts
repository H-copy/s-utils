import {
  computed,
  ref,
  watch
} from 'vue'
import {
  useToggle
} from '../useToggle'
import {
  useBool
} from '../useBool'

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type MouseWheelDirection = 'up' | 'down'

/**
 * 鼠标滚轮
 * @module hooks
 * @returns { Object }
 * - wheelEvent 滚轮事件对象
 * - direction 滚动方向 'up' | 'down'
 * - isUp 滚动方向是否为上
 * 
 * - setUp() direction 设置为 'up'
 * - setDown() direction 设置为 'down'
 * - onMousewheel() 鼠标滚轮事件
 * 
 * - disabled 是否响应滚轮事件
 * - canUse disabled 设置为 false 开启 onMousewheel
 * - unUse disabled 设置为 true 关闭 onMousewheel
 * 
 * @example
 * 
 * <a-input-number
 *  @focus.stop='onFocus'
 *  @blur.stop='onBlur'
 *  v-model:value='valueProxy'
 *  >
 * </a-input-number>
 * 
 * 
 * {
 *   props: {
 *    value: { type: Number, default: 0 },
 *    step: { type: Number, default: 1 } 
 *   },
 *   setup(props, ctx){
 *      const valueProxy = computed<number>({
 *    get(){
 *       return props.value
 *    },
 *      set(d: number){
 *       ctx.emit('update:value', d)
 *      }
 *    })
 *
 *    const {
 *      isUp,
 *      canUse,
 *      unUse,
 *      wheelEvent,
 *      onMousewheel
 *    } = useMousewheel()
 *
 *    watch(wheelEvent, () =>  {
 *      isUp.value ? valueProxy.value -= props.step : valueProxy.value += props.step
 *    })
 *    
 *    const onFocus = canUse
 *    const onBlur = unUse
 *    
 *    return { ... }
 *  }
 * }
 * 
 */
export function useMousewheel() {
  const wheelEvent = ref<any>()
  const { state: direction, setLeft: setUp, setRight: setDown } = useToggle('up', 'down')
  const { state: disabled, setTrue: unUse, setFalse: canUse } = useBool()
  const isUp = computed(() => direction.value === 'up')

  watch(wheelEvent, (newVal) => {
    if (newVal) {
      newVal.deltaY as number < 0 ? setUp() : setDown()
    }
  })

  const onMousewheel = (e: any) => {
    if (disabled.value) {
      return
    }
    wheelEvent.value = e
  }

  return {
    wheelEvent,
    direction,
    isUp,
    setUp,
    setDown,

    disabled,
    canUse,
    unUse,

    onMousewheel
  }
}
