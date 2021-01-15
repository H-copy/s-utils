/**
 * 本地缓存包装函数
 * @author copy-left
 * @time 2020-11-10
 * 
 */

let registed = false 

/**
 * 本地缓存包装函数
 * 
 * @summary 
 * 为本地缓存对象 localStorage，sessionStorage 添加 setItem getItem 包装函数
 * 包装函数将原字符参数或返回值通过JSON转换为对象
 * 
 * @remind
 * 因为使用JSON对数据做转换, 数据格式必须服务json格式, 所以报错纯字符时将报错,
 * 此时可以使用原生方法
 * 
 * @example
 * import { registSaveFn } from '@micro/utils'
 * registSaveFn() //全局调用一次
 *  
 * const saveKey = 'USER'
 * localStorage.$setItem(saveKey, { name: 'copy', sex: 'man' })
 * const user = localStorage.$getItem(saveKey)
 * console.log(user.name)
 */
export function registSaveFn():void {
  if(registed){return}

  localStorage.__proto__.$setItem = buildSetItem(localStorage)
  localStorage.__proto__.$getItem = buildGetItem(localStorage)

  sessionStorage.__proto__.$setItem = buildSetItem(sessionStorage)
  sessionStorage.__proto__.$getItem = buildGetItem(sessionStorage)
  
  registed = true
}

export function buildSetItem (storage:typeof localStorage | typeof sessionStorage): <T = any>(key: string, data: T) => void {
  return <T = any>(key: string, data: T) => {
    try {
      const dataStr = JSON.stringify(data)
      storage.setItem(key, dataStr)
    } catch (error) {
      console.error(`${typeof (storage)} 设置失败: `, error)
      return null
    }
  }
}

export function buildGetItem (storage:typeof localStorage | typeof sessionStorage): <T = any>(key: string) => T | null {
  return <T = any>(key: string): T | null => {
    const dataStr = storage.getItem(key)
    try {
      return dataStr ? JSON.parse(dataStr) : null
    } catch (error) {
      console.error(`${typeof(storage)} 获取失败: `, error)
      return null
    }
  }
}

