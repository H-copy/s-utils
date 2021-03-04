/**
 * 拖拽
 * @packageDocumentation
 * @module vx-hooks/useDragArea
 */


import { ref, Ref } from 'vue'
import { useBool } from '../useBool'

export interface AnyFunction {
  (...args: any): any
}

// 数据获取标识
const DATA_SIGN = 'DRAG'

export function getDragDataSign() {
  return DATA_SIGN
}


export interface UseDragAPI{
  bindDragstart: <T>(data: T) => (e: DragEvent) => void
}

/**
 * DOM 拖拽绑定
 * @returns { { elems, handlers, bindEle } } 
 * - elems Ref 已绑定元素列表
 * - handlers Ref 数据绑定函数
 * - bindEle any => element => void 接收事件传参，返回dom元素收集器
 * @example
 * ```typescript
 * const { bindEle } = useDrag()
 * const element = document.querySelector('.move-block')
 * element.onDragstart = bindDragstart({id: 1})
 * ```
 */
export function useDrag(dataSign = DATA_SIGN):UseDragAPI {
  const bindDragstart = <T>(data: T) => (e: DragEvent) => {
    /* eslint-disable-next-line no-unused-expressions */
    e.dataTransfer?.setData(dataSign, JSON.stringify(data))
  }

  return { bindDragstart }
}

export interface DragEvents {
  dragover?: (e: DragEvent) => void
  dragenter?: (e: DragEvent) => void
  dragleave?: (e: DragEvent) => void
  dragstart?: (e: DragEvent) => void
  dragend?: (e: DragEvent) => void
  drop?: (e: DragEvent) => void
  paste?: (e: DragEvent) => void
}


export interface DragCallbackType {
  onDom?(domStr: string, e: DragEvent): void  
  onUri?(url: string, e: DragEvent): void
  onFiles?(files: DataTransfer['files'], e: DragEvent): void
  onText?(text: string, e: DragEvent): void
  onAny?(e: DragEvent): void
}

// 函数存在既运行
function hasAndRun(fn?: (...args: any) => any, ...args: any[]) {
  if (fn) {
    fn(...args)
  }
}

export interface UseDragAreaAPI {
  dragEvents: {
    dragover: (e: DragEvent) => void;
    dragenter: (e: DragEvent) => void;
    dragleave: (e: DragEvent) => void;
    dragstart: (e: DragEvent) => void;
    dragend: (e: DragEvent) => void;
    paste: (e: DragEvent) => void;
    drop: (e: DragEvent) => void;
  };
  isHovering: Ref<boolean>;
  isRun: Ref<boolean>;
}

/**
 * 拖拽区 hook
 * @param { Object } options 拖拽响应回调, 用于处理不同类型数据
 * - onDom dom拖拽释放回调
 * - onUri uri拖拽释放回调
 * - onFiles file拖拽释放回调
 * - onText text拖拽释放回调
 * @param { Object } events 自定义拖拽事件
 * @param { string } dataSign 拖拽取值标识
 * 
 * @returns { array  } 
 * - props 拖拽监听函数
 * - isHovering 是否进入监听区
 * 
 * @example
 * ``` typescript
 * 
 * const dropType = {
 *   onDom(data){
 *    console.log()
 *   }
 * }
 * const { dragEvents } = useDragArea(dropType)
 * 
 * ------
 * <div class='area' v-on='dragEvents'>
 * </div>
 * 
 * ```
 */
export function useDragArea(
  dropType = {} as DragCallbackType,
  events = {} as DragEvents,
  dataSign = DATA_SIGN
):UseDragAreaAPI {
  const optionsRef = ref(dropType)
  const { state: isHovering, setTrue: startHover, setFalse: endHover } = useBool()
  const { state: isRun, setTrue: startRun, setFalse: endRun } = useBool()

  const callback = (dataTransfer: DataTransfer | null, event: DragEvent) => {
    if (dataTransfer === null) {
      return
    }

    const url = dataTransfer.getData(dataSign)
    const dom = dataTransfer.getData(dataSign)

    const {
      onDom,
      onUri,
      onFiles,
      onText,
      onAny
    } = optionsRef.value

    if (dom && onDom) {
      onDom(JSON.parse(dom), event)
      return
    }

    if (url && onUri) {
      onUri(url, event)
      return
    }

    if (dataTransfer.files && dataTransfer.files.length && onFiles) {
      onFiles(dataTransfer.files, event)
      return
    }

    if (dataTransfer.items && dataTransfer.items.length && onText) {
      dataTransfer.items[0].getAsString((text) => { onText(text, event) })
      return
    }

    if (onAny) {
      onAny(event)
    }
  }

  const {
    dragover,
    dragenter,
    dragleave,
    dragstart,
    dragend,
    paste,
    drop
  } = events

  const dragEvents = {
    dragover: (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      hasAndRun(dragover, e)
    },
    dragenter: (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      startHover()
      hasAndRun(dragenter, e)
    },
    dragleave: (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      endHover()
      hasAndRun(dragleave, e)
    },
    dragstart: (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      startRun()
      hasAndRun(dragstart, e)
    },
    dragend: (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      endRun()
      hasAndRun(dragend, e)
    },
    paste: (e: DragEvent) => {
      callback(e.dataTransfer, e)
      hasAndRun(paste, e)
    },
    drop: (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      endHover()
      callback(e.dataTransfer, e)
      hasAndRun(drop, e)
    }
  }

  return {
    dragEvents,
    isHovering,
    isRun
  }
}
