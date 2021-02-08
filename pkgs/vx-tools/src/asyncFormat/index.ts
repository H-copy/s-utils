/**
 * 异步包装
 * @packageDocumentation
 * @module vx-tools/asyncFormat
 */

/**
 * async 异步包装
 * @param { promise } promise 被包装promise
 * @returns { pormise } 包装后的promise
 * @summary 将 aysnce await 错误作为返回值的处理方式
 * 
 * @example
 *  asynce load(){
 * 
 *      const [ res, err ] = await asyncFormat( api(...) ) 
 *      
 *      if(res === null){
 *        console.log(err)
 *        return 
 *      }
 *  
 *  }
 */
export async function asyncFormat<T, U = any>(promise:Promise<T>):Promise<[T, null] | [null, U]>{
  return promise.then(res => [res, null] as [T, null] ).catch((err:U) => [null, err])
}
