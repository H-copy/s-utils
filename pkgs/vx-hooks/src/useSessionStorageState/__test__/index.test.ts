import { useSessionStorageState } from '../index'

// sessionStore mock
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


describe('useSessionStorageState', () => {
  test('', () =>{
    const valKey = 'data'
    const initData = 10
    const { state, update } = useSessionStorageState(valKey, initData)
    expect(state.value).toEqual(initData)
    expect(sessionStorage.getItem(valKey)).toEqual(JSON.stringify(initData))

    const targetVal = 20
    update(targetVal)
    expect(state.value).toEqual(targetVal)
    expect(sessionStorage.getItem(valKey)).toEqual(JSON.stringify(targetVal))
    
  })
})