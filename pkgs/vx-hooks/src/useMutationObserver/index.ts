/**
 * 响应元素属性变化
 * @packageDocumentation
 * @module vx-hooks/useMutationObserver
 */
import { ref, watch, Ref, WatchStopHandle } from 'vue'

/** useMutationObserver 参数 */
export interface useMutationObserverOptions {
  /** 绑定元素 */
  target?: Ref<HTMLElement | undefined>;
  /** 观察属性配置 */
  options?: MutationObserverInit;
  /** 响应回调 */
  handler: (mutationsList: MutationRecord[], observer: MutationObserver) => void
}

/** useMutationObserver API */
export interface useMutationObserverAPI {
  /** 绑定元素 */
  element: Ref<HTMLElement | undefined>;
  /** 观察对象 */
  observer: Ref<MutationObserver | undefined>;
  /** watch 中断 */
  watchStop: WatchStopHandle;
}

/** useMutationObserver 默认属性配置 */
export const defaultMutationObserverInit = { attributes: true }

/**
 * 响应元素属性变化
 * @example
 * ``` typescript
 * {
 *   template : `
 *      <div id='box' :style='style' ref='element' @click='change'>
 *      </div>
 *    `,
 *    props: ['handler'],
 *    setup(props: any){
 *      const style = ref({
 *        width: '100px',
 *        height: '100px'
 *      })
 * 
 *      const change = () =>{
 *        style.value = {
 *          width: '200px',
 *          height: '200px'
 *        }
 *      }
 * 
 *      const { element } = useMutationObserver({
 *        handler: props.handler
 *      })
 * 
 *      return{
 *        style,
 *        change,
 *        element, 
 *      }
 *    }
 * }
 * 
 * ```
 */
export function useMutationObserver(conf: useMutationObserverOptions): useMutationObserverAPI {
  const element = conf.target ? conf.target : ref() as Ref<HTMLElement | undefined>
  const observer = ref<MutationObserver | undefined>()
  const options = conf.options ? { ...defaultMutationObserverInit, ...conf.options } : defaultMutationObserverInit

  const bind = () => {
    if (observer.value) {
      observer.value.disconnect()
    }

    if (!element.value) {
      return
    }

    observer.value = new MutationObserver(conf.handler)
    observer.value.observe(element.value, options)
  }

  const watchStop = watch(element, bind, { immediate: true })

  return {
    element,
    observer,
    watchStop
  }
}