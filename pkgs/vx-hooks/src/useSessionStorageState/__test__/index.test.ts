import { useSessionStorageState } from '../index'

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