import { 
  ref, 
  computed,
  Ref
} from 'vue'

/**
 * 转换hook
 * @param { any } initStatus 初始值 
 * @param { any } reverseValue 切换值 
 * @returns{ { state, toggle, setLeft, setRight } }  state 当前状态值  toggle 切换函数  setLeft 设置默认值  setRight 设置转换值
 * 
 * @example
 * 
 * const { currentStatus, toggle, setLeft as open, setRight as close } = useToggle('open', 'close')
 * 
 *  模板
 *  <div>
 * 
 *      <h1> {{ currentStatus }} </h1>
 *      <button @click='toggle'> toggle </button>
 *      <button @click='open'> open </button>
 *      <button @click='close'> close </button>
 *      
 *  </div>
 *  
 */
export function useToggle(initStatus?:boolean, reverseValue?:boolean):{ state: Ref<boolean>, toggle: (v?:boolean) => void, setLeft: () => void, setRight: () => void }
export function useToggle<T, U>(initStatus:T, reverseValue:U):{ state: Ref<T | U>, toggle:(v?:T|U) => void, setLeft: () => void, setRight: () => void }
export function useToggle(initStatus?:unknown, reverseValue?:unknown):any{
  const _initStatus = initStatus === undefined ? false : initStatus
  
  const state = ref(_initStatus)
  const reverseValueOrigin = computed(() => { return reverseValue === undefined ? !_initStatus : reverseValue })

  function toggle(value?:any){
    if(value !== undefined){
      state.value = value === _initStatus ? reverseValueOrigin.value : _initStatus
    }
    state.value = state.value === _initStatus ? reverseValueOrigin.value : _initStatus
  }
  
  const setLeft = () => { state.value = _initStatus }
  const setRight = () => { state.value = reverseValueOrigin.value }

  return {
    state,
    toggle,
    setLeft,
    setRight
  }
}
