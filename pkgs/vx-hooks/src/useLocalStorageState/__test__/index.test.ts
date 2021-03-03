import { useLocalStorageState } from '../index'

// localStore mock
let __localStore:{[s:string]: string} = {}
let __localKeys = new Set<string>() 
global.localStorage = {
  getItem: (key:string) => __localStore[key],
  setItem: (key: string, val: string) => { __localStore[key] = val; __localKeys.add(key) },
  clear: () => { __localStore = {}; __localKeys = new Set<string>() },
  removeItem: (key: string) => { delete __localStore[key]; __localKeys.delete(key) },
  key: (index: number):string => [...__localKeys][index],
  length: 0,
}

describe('useLocalStorageState', () => {
  test('', () =>{
    const valKey = 'data'
    const initData = 10
    const { state, update } = useLocalStorageState(valKey, initData)
    expect(state.value).toEqual(initData)
    expect(localStorage.getItem(valKey)).toEqual(JSON.stringify(initData))

    const targetVal = 20
    update(targetVal)
    expect(state.value).toEqual(targetVal)
    expect(localStorage.getItem(valKey)).toEqual(JSON.stringify(targetVal))
    
  })
})