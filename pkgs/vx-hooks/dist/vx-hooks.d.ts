import { ComputedRef } from 'vue';
import { Ref } from 'vue';

export declare type Fn = (...args: any[]) => any;

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
export declare interface IuseTimeLoop {
    run: (...args: any[]) => void;
    stop: () => void;
    isRun: Ref<boolean>;
    setCallback: (callback: Fn) => Fn;
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
export declare interface IuseTimeout {
    run: (...args: any[]) => void;
    stop: () => void;
    isRun: Ref<boolean>;
    setCallback: (callback: Fn) => Fn;
}

/** X轴方向  */
export declare type MouseWheelDirectionX = 'left' | 'right' | 'unchange';

/** Y轴方向  */
export declare type MouseWheelDirectionY = 'up' | 'down' | 'unchange';

/** Z轴方向  */
export declare type MouseWheelDirectionZ = 'out' | 'in' | 'unchange';

/** 值单位类型  */
export declare type MouseWheelType = 'px' | 'line' | 'page' | 'undefined';

/**
 * 滚轮事件值单位类型断言
 * @param n 类型值
 * @returns
 * 类型名称
 */
export declare function mouseWheelTypeMap(n: number): MouseWheelType;

/**
 * 布尔值切换
 * @param { boolean } initStatus 初始值
 * @returns { object }

 */
export declare function useBool(initStatus?: boolean): UseBoolAPI;

/**
 * useBool API
 */
export declare interface UseBoolAPI {
    /** 当前状态 */
    state: Ref<boolean>;
    /** state 设为 true */
    setTrue: () => void;
    /** state 设为 fasel */
    setFalse: () => void;
    /**
     * 状态切换
     *
     * @example
     * ``` ts
     * toggle() => 当前状态的反值
     * toggle(true)
     * toggle(false)
     * ```
     */
    toggle: (value?: boolean | undefined) => void;
}

/**
 * Map类型 hook
 * @param initVal - 初始Map配置
 * @typeParam T - map key 类型
 * @typeParam U - map value 类型
 *
 * @example
 * ``` ts
 * <template>
 *   <div class="home">
 *     <div>
 *         <input v-model='newName' />
 *         <button @click='add'>
 *             add
 *       </button>
 *       <ul>
 *           <li v-for='name of names' :key='name' @click='remove(name)' >
 *                 {{ name }}
 *         </li>
 *       </ul>
 *     </div>
 *   </div>
 * </template>
 * <script>
 * import { ref, computed } from 'vue'
 * import { useMap } from 'vx-hook'
 * export default {
 *   setup(){
 *     const newName = ref('')
 *     const { map, get, set, remove } = useMap([
 *       [ 'Rogen', 1 ],
 *       [ 'Coco', 2 ],
 *       [ 'Jim', 3 ]
 *     ])
 *     const names = computed(() => [ ...map.keys() ])
 *     const add = () => set(newName, names.value.length)
 *
 *     return {
 *       newName,
 *       names,
 *       remove
 *     }
 *   }
 * }
 * </script>
 * ```
 */
export declare function useMap<T, U>(initVal?: Iterable<readonly [T, U]>): UseMapAPI<T, U>;

/**
 * useMap API
 * - map Map容器
 * - get 获取值
 * - set 设置值
 * - setAll 重设Map值
 * - remove 移除值
 * - reset 将值还原为初始值
 * - resetInit 重设初始值
 */
export declare interface UseMapAPI<T, U> {
    map: Ref<Map<T, U>>;
    get: (key: T) => U | undefined;
    set: (key: T, val: U) => void;
    setAll: (newMap: Iterable<readonly [T, U]>) => void;
    remove: (key: T) => void;
    reset: () => Map<T, U>;
    resetInit: (newMap: Iterable<readonly [T, U]>) => any;
}

/**
 * 鼠标滚轮hook
 * @example
 * ``` ts
 * <template>
 *    <input
 *    v-model='value'
 *    @foucs='canUse'
 *    @blur='unUse'
 *    @mousewheel='onMousewheel' />
 *  </template>
 *  <script>
 *
 *  export default {
 *    setup(){
 *      const {
 *        isUp,
 *        isDown,
 *        directionY,
 *        wheelEvent,
 *        unUse,
 *        canUse,
 *        onMousewheel,
 *      }
 *      const count = ref(0)
 *
 *      watch(wheelEvent, () => { *
 *        if(isUp(directionY.value)){
 *          count.value -= 1
 *        } *
 *        if(isDown(directionY.value)){
 *          count.value += 1
 *        }
 *
 *      })
 *
 *      return {
 *        onMousewheel,
 *        unUse,
 *        canUse,
 *      }
 *    }
 *  }
 * ```
 */
export declare function useMousewheel(): UseMousewheelAPI;

/**
 * 鼠标滚轮 hook 返回 API
 *
 * ### 方向断言
 * - isUp(s: string)
 * - isDown(s: string)
 * - isLeft(s: string)
 * - isRight(s: string)
 * - isOut(s: string)
 * - isIn(s: string)
 * - isUnchange(s: string)
 * - typeCheck(s: string, t?: string)
 *
 * ### 方向
 * - directionY
 * - directionX
 * - directionZ
 *
 * ### 开关
 * - disabeld 是否可用
 * - canUse()
 * - unUse()
 *
 * ### 事件
 * - onMousewheel()
 */
export declare interface UseMousewheelAPI {
    isUp: (s: string) => boolean;
    isDown: (s: string) => boolean;
    isLeft: (s: string) => boolean;
    isRight: (s: string) => boolean;
    isOut: (s: string) => boolean;
    isIn: (s: string) => boolean;
    isUnchange: (s: string) => boolean;
    canUse: () => void;
    unUse: () => void;
    onMousewheel: (e: WheelEvent) => void;
    typeCheck: (s: string, t?: string) => boolean;
    wheelEvent: Ref<WheelEvent>;
    disabled: Ref<boolean>;
    wheelType: ComputedRef<MouseWheelType>;
    directionY: ComputedRef<MouseWheelDirectionY>;
    directionX: ComputedRef<MouseWheelDirectionX>;
    directionZ: ComputedRef<MouseWheelDirectionZ>;
}

/**
 * Set hooks
 * @param { Array } initVal 初始数据
 * @summary 对Set类型做的hook封装，利用Set的幂等性
 * @returns
 * - set Set容器
 * - add 添加项
 * - remove 移除项
 * - reset 重置
 * - setInit 设置初始值
 * - update 更新 Set容器以及初始值
 * @exports
 * const [ set, utils ] = useSet([ 1, 2 ])
 *
 * 添加
 * set.add(3) ==> [1, 2, 3]
 * set.add(2) ==> [1, 2, 3]
 *
 * 移除
 * set.remove(1) ==> [2, 3]
 *
 * 重置
 * set.reset()  ==> [1, 2]
 *
 *
 * 其他Set方法
 *
 * 校验
 * set.value.has(1) ==> true
 *
 * 遍历
 * const newList = [...set.value].map(num => num + 1)  ==> [ 2, 3 ]
 *
 */
export declare function useSet<T>(initVal?: Iterable<T>): {
    set: Ref<Set<T>>;
    add: (val: T) => Set<T>;
    remove: (val: T) => Set<T>;
    reset: () => Set<T>;
    setInit: (initVal: Iterable<T>) => Set<T>;
    update: (initVal: Iterable<T>) => void;
};

export declare function useTimeLoop(callback: Fn, t?: number): IuseTimeLoop;

export declare function useTimeout(callback: Fn, t?: number): IuseTimeout;

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
export declare function useToggle(initStatus?: boolean, reverseValue?: boolean): {
    state: Ref<boolean>;
    toggle: (v?: boolean) => void;
    setLeft: () => void;
    setRight: () => void;
};

export declare function useToggle<T, U>(initStatus: T, reverseValue: U): {
    state: Ref<T | U>;
    toggle: (v?: T | U) => void;
    setLeft: () => void;
    setRight: () => void;
};

export { }
