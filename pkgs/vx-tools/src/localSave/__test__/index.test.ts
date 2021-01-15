import {
  registSaveFn
} from '../index'
import {
  isObject
} from '../../assert'

let __loclStore:{[s:string]: string} = {}
let __localKeys = new Set<string>() 
global.localStorage = {
  getItem: (key:string) => __loclStore[key],
  setItem: (key: string, val: string) => { __loclStore[key] = val; __localKeys.add(key) },
  clear: () => { __loclStore = {}; __localKeys = new Set<string>() },
  removeItem: (key: string) => { delete __loclStore[key]; __localKeys.delete(key) },
  key: (index: number):string => [...__localKeys][index],
  length: 0,
}

let __sessionStore:{[s:string]: string} = {}
let __sessionKeys = new Set<string>() 
global.sessionStorage = {
  getItem: (key:string) => __sessionStore[key],
  setItem: (key: string, val: string) => { __sessionStore[key] = val; __sessionKeys.add(key) },
  clear: () => { __sessionStore = {}; __sessionKeys = new Set<string>() },
  removeItem: (key: string) => { delete __sessionStore[key]; __sessionKeys.delete(key) },
  key: (index: number):string => [...__sessionKeys][index],
  length: 0,
}

registSaveFn()

describe('registSaveFn', () => {

  test('localStorage  baseType', () => {
    const key = 'localVal'
    const val = 'loc !'
    localStorage.$setItem(key, val)
    expect(localStorage.$getItem(key)).toBe(val)
  })
  
  test('localStorage object', () => {
    const key = 'localVal'
    const val = {
      name: 'ject',
      age: 12
    }
    localStorage.$setItem(key, val)
    expect(localStorage.$getItem(key)).toMatchObject(val)
  })

  test('sessionStorage  baseType', () => {
    const key = 'sessionVal'
    const val = 'session !'
    sessionStorage.$setItem(key, val)
    expect(sessionStorage.$getItem(key)).toBe(val)
  })
  
  test('sessionStorage object', () => {
    const key = 'sessionVal'
    const val = {
      name: 'ject',
      age: 12
    }
    sessionStorage.$setItem(key, val)
    expect(sessionStorage.$getItem(key)).toMatchObject(val)
    expect(isObject(sessionStorage.$getItem(key))).toBeTruthy()
  })
  
})

