/**
 * 响应尺寸变化
 * @packageDocumentation
 * @module vx-hooks/useSize
 */
// import ResizeObserver from 'resize-observer-polyfill';
import { useMutationObserver } from '../useMutationObserver'
import { ref, Ref, watch, WatchStopHandle } from 'vue'

export interface SizeOptions{
  width?: number;
  height?: number;
  clientWidth?: number;
  clientHeight?: number;
  offsetWidth?: number;
  offsetHeight?: number;
  scrollWidth?: number;
  scrollHeight?: number;
}

/** useSize API */
export interface UseSizeAPI {
  /** 中断响应 */
  watchStop: WatchStopHandle;
  /** 绑定对象 */
  element: Ref<HTMLElement | undefined>;
  /** 尺寸值 */
  state: Ref<{
    width?: number;
    height?: number;
    clientWidth?: number;
    clientHeight?: number;
    offsetWidth?: number;
    offsetHeight?: number;
    scrollWidth?: number;
    scrollHeight?: number;
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
export function useSize(target?: Ref<HTMLElement | undefined>) {

  const state = ref({
    width: 0,
    height: 0,
    clientWidth: 0,
    clientHeight: 0,
    offsetWidth: 0,
    offsetHeight: 0,
    scrollWidth: 0,
    scrollHeight: 0,
  })

  const updateState = (target: HTMLElement) =>{

    state.value = {
      width: target.scrollWidth || target.offsetWidth,
      height: target.scrollHeight || target.offsetHeight,
      clientWidth: target.clientWidth,
      clientHeight: target.clientHeight,
      offsetWidth: target.offsetWidth,
      offsetHeight: target.offsetHeight,
      scrollWidth: target.scrollWidth,
      scrollHeight: target.scrollHeight,
    }
  }

  const handler = (mutationsList: MutationRecord[]) =>{
    mutationsList.map((item: MutationRecord) => {
      const target = item.target as HTMLElement
      updateState(target)
    })
  }

  const options = { attributeFilter: ['style'] }
  const setting = target ? {target, handler, options} : {handler, options}
  const { element, observer, watchStop } =  useMutationObserver(setting)

  watch(element, () => {
    console.log('change', element.value)
    if(element.value){
      updateState(element.value)
    }
  }, { immediate: true })
  

  return {
    watchStop,
    element,
    state,
    observer
  }
}