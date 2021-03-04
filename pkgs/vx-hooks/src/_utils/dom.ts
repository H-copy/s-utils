/** @internal */

import { isRef,  Ref } from 'vue'

export type BaseTarget<T = HTMLElement> =
  | (() => T | null)
  | T
  | null
  | Ref<T>

type TargetElement = HTMLElement | Element | Document | Window;


export function getTargetElement(target: BaseTarget<TargetElement>, defaultElement?: TargetElement): TargetElement | undefined | null
{

  if (!target) {
    defaultElement
  }

  if (typeof target === 'function') {
    return target()
  }

  if (isRef(target)) {
    return target.value
  }

  return target
  
}