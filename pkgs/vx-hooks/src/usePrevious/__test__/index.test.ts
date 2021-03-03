import { usePrevious } from '../index'

describe('usePrevious', () => {

  test('init', () => {
    const initVal = 0
    const { curRef } = usePrevious(initVal)
    expect(curRef.value).toEqual(initVal)
  })

  test('change 0 -> 10', () => {
    const initVal = 0
    const target = 10
    const { curRef, prevRef } = usePrevious(initVal)
    expect(curRef.value).toEqual(initVal)
    expect(prevRef.value).toEqual(undefined)
    
    curRef.value = target
    expect(curRef.value).toEqual(target)
    expect(prevRef.value).toEqual(initVal)
  })


  test('compare function', () => {
    const initVal = 0
    const compare = (__?: number, oldVal?: number) => {
      return oldVal === undefined || oldVal < 10
    }
    const { curRef, prevRef } = usePrevious<number>(initVal, compare)
    const target1 = curRef.value = 5
    expect(curRef.value).toEqual(target1)
    expect(prevRef.value).toEqual(initVal)

    const target2 = curRef.value = 12
    expect(curRef.value).toEqual(target2)
    expect(prevRef.value).toEqual(target1)
    
    const target3 = curRef.value = 15
    expect(curRef.value).toEqual(target3)
    expect(prevRef.value).toEqual(target1)
  })

  
})