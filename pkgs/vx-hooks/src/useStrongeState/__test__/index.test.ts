import { useStorageState } from '../index'

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

const valKey = 'DATA'

beforeEach(() => {
  sessionStorage.removeItem(valKey)
})

describe('useStorageState', () => {

  test('init', () => {
    const initValList = [
      10,
      'string',
      null,
      undefined,
      {id: 1},
      [1, 2, 3]
    ]

    initValList.map(item => {
      const { state } = useStorageState(sessionStorage, valKey, item)
      expect(state.value).toEqual(item)
      expect(sessionStorage.getItem(valKey)).toEqual(JSON.stringify(item))
      sessionStorage.removeItem(valKey)
    })
  })

  test('defaultValue', () => {
    const initVal1 = 10 
    const initVal2 = 20
    sessionStorage.setItem(valKey, JSON.stringify(initVal2))
    const { state } = useStorageState(sessionStorage, valKey, initVal1)
    expect(state.value).toEqual(initVal2)
  })

  test('update', () => {
    const initVal1 = 10 
    const initVal2 = 20
    const { state, update } = useStorageState(sessionStorage, valKey, initVal1)
    expect(state.value).toEqual(initVal1)
    update(initVal2)
    expect(state.value).toEqual(initVal2)
    expect(sessionStorage.getItem(valKey)).toEqual(JSON.stringify(initVal2))

    update()
    expect(sessionStorage.getItem(valKey)).toBeUndefined()
  })
  
})