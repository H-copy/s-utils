/**
 * 延时器
 * @packageDocumentation
 * @module vx-tools/Clock
 */


/**
 * 计时器
 * @summary 
 * 记录一段或多段时间间隔
 * 
 * @example
 * ```ts
 *  const c = new Clock // or Clock.create()
 *  
 *  c.tick()
 *  setTimeout(() => {
 *    c.tick()
 *  }, 1000)
 * 
 *  setTimeout(() => {
 *   console.log('time:', c.nextTick())
 *  }, 2000)
 *  
 * ```
 */
 export class Clock{

  // 迭代器终止标识
  static END = 'END'
 
  // 工厂函数
  static create() {
    return new Clock()
  }
 
   private _times:number[] = []
   private _currentTick = 0
   
   // 获取记录列表
   _getTimes() {
     return [...this._times]
   }
   
   /**
    * 打点记录
    */
   tick() {
     this._times.push((new Date()).getTime())      
   }
 
   /**
    * 清空记录
    */
   clean() {
     this._times = []
   }
   
   /**
    * 记录条数
    * @returns number
    */
   len() {
     return this._times.length
   }
 
   /**
    * 获取记录间隔
    * @param start 
    * @param end 
    * @returns 
    */
   getTick(start:number, end: number) {
     const startTime = this._times[start]
     const endTime = this._times[end]
     if (!startTime || !endTime) {
       throw new Error(`查询越界: ${start} - ${end}`)
     }
     return endTime - startTime
   }
 
   /**
    * 最后一条间隔
    * @returns number
    */
   lastTick() {
     return this.getTick(this._times.length - 2, this._times.length - 1)
   }
 
   /**
    * 第一条间隔
    * @returns number
    */
   firstTick() {
     return this.getTick(0, 1)
   }
   
   /**
    * 每条间隔迭代器
    * @returns number
    */
   nextTick() {
     if (this._currentTick >= this._times.length - 1) {
       return Clock.END
     }
     
     const current = this._currentTick
     const next = this._currentTick += 1
     
     return this.getTick(current, next)
   }
 
   /**
    * 重置迭代器指针
    */
   resetTick() {
     this._currentTick = 0
   }
 
   /**
    * 当前迭代器指针位置
    */
   currentTick() {
     return this._currentTick
   }
 }
 
 