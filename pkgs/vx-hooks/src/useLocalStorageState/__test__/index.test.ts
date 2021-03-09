import { useLocalStorageState } from '../index'

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