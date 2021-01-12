/**
 * 计时器
 * @author copy-left
 * @time 2020-11-03
 */
import { ref, Ref } from 'vue'
import { useBool } from '../useBool'

const SECOND = 1000
export type Fn = (...args:any[]) => any

/**
 * 定时执行器 interval hook
 * @param { functioin } callback 回调 
 * @param { number } t 时间间隔 
 * @return 
 *  run()  启动定时器
 *  stop() 关闭定时器
 *  isRun.value 是否运行中
 *  setCallback() 设置回调
 */
export interface IuseTimeLoop{
	run: (...args: any[]) => void;
	stop: () => void;
	isRun: Ref<boolean>;
	setCallback: (callback: Fn) => Fn;
}

export function useTimeLoop(callback:Fn, t = 30):IuseTimeLoop {

  const { state: isRun, setTrue, setFalse } = useBool()
  const time = ref()
  const cb = ref(callback)
  
  const stop = () => {
    time.value&&clearInterval(time.value)
    setFalse()
  	time.value = undefined
  }
  
  const run = (...args:any[]) => {
    stop()
    setTrue()
    time.value = setInterval(cb.value, t * SECOND, ...args)
  }
  
  const setCallback = (callback:Fn) => cb.value = callback
  
  return { run, stop, isRun, setCallback }
}


/**
 * 定时器 timeout
 * @summary
 * 使用 timeout 实现的定时器，兼容Promise回调，
 * 当回调返回Promise时，将等待Promise执行完成后，
 * 出入下一次计时
 * @param { functioin | Promise } callback 执行回调
 * @param { number } t 时间间隔
 * @returns { Object }
 *  run()  启动定时器
 *  stop() 关闭定时器
 *  isRun.value 是否运行中
 *  setCallback() 设置回调
 * 
 * @exmaple
 * const { run, stop, isRun } = useTimeout()
 * async function update(){
 *   try{
 *      await API.update()  
 *   }catch(e){
 *      console.error(e)
 *      stop()
 *   }
 * }
 * 
 * @tips
 * 中断处理:
 *  对于callback为Promise的情况, callback内执行stop。
 *  存在clearTimeout无法中断循环的情况, 主要因为clearTimeout清理的是timeout的执行,
 *  必须在回调执行前。
 *  所以 run 循环需要通过 isRun 判断是否执行下一计时器. 
 *  统一将中断封装为 stop 函数
 * 
 */
export interface IuseTimeout{
	run: (...args: any[]) => void;
	stop: () => void;
	isRun: Ref<boolean>;
	setCallback: (callback: Fn) => Fn;
}


export function useTimeout(callback:Fn, t = 0):IuseTimeout{
  const { state: isRun, setTrue, setFalse } = useBool()
  const time = ref()
  const cb = ref(callback)
  
  const stop = () => {
  		time.value&&clearTimeout(time.value)
  		setFalse()
  }
  
  const run = (...args:any[]) => {
    setTrue()
    time.value = setTimeout(async () => {
      await callback(...args)
      isRun.value && run()
    }, t * SECOND)
  } 
  
  const setCallback = (callback:Fn) => cb.value = callback
  
  return { run, stop, isRun, setCallback }
}
  