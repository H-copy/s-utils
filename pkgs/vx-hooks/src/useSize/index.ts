/**
 * 响应尺寸变化
 * @packageDocumentation
 * @module vx-hooks/useSize
 */
import ResizeObserver from 'resize-observer-polyfill';
import { ref, watch, Ref, WatchStopHandle } from 'vue'

/** useSize API */
export interface UseSizeAPI {
  /** 中断响应 */
  watchStop: WatchStopHandle;
  /** 绑定对象 */
  element: Ref<HTMLElement | undefined>;
  /** 尺寸值 */
  state: Ref<{
    width: number;
    height: number;
  }>;
}

/**
 * 响应尺寸变化
 * @param target 预设dom
 * @example
 * ``` typescript
 * <div id='box' ref='element' :style='style' @click='onChange'> {{ state }} </div>
 * 
 * const style = ref({width: '100px', height: '100px', background: 'orange'})
 * const { state, element } = useSize()
 * const onChange = () => {
 *  style.value = {...style.value, width: `${parseInt(Math.random() * 400)}px`, height: `${parseInt(Math.random() * 400)}px`}
 * }
 * 
 * ```
 */
export function useSize(target?: Ref<HTMLElement | undefined>): UseSizeAPI {
  const element = target ? target : ref(target) as Ref<HTMLMapElement | undefined>

  const state = ref({
    width: 0,
    height: 0
  })

  const updateState = (width = 0, height = 0) => {
    state.value = {
      width,
      height
    }
  }

  const resizeObserver = ref<any>(null)
  const watchStop = watch(element, () => {

    // 解绑旧数据
    if (resizeObserver.value) { resizeObserver.value.disconnect() }
    if (!element.value) return

    const { scrollWidth, scrollHeight } = element.value
    updateState(scrollWidth, scrollHeight)

    // 缓存新绑定
    resizeObserver.value = new ResizeObserver((entries: any) => {
      entries.forEach((entry: any) => {
        updateState(entry.target.scrollWidth, entry.target.scrollHeight)
      })
    })
    resizeObserver.value.observe(element.value);
  }, { immediate: true })



  return {
    watchStop,
    element,
    state,
  }
}