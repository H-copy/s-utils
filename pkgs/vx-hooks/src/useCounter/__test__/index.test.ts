import { useCounter } from '../index'

describe('useCounter', () => {
  
  test('init', () => {
    const { current } = useCounter(10)
    expect(current.value).toBe(10)
  })

  test('api', () => {
    const { current, set, inc, dec, reset } = useCounter(10)
    expect(current.value).toBe(10)

    set(0)
    expect(current.value).toBe(0)
    
    inc()
    expect(current.value).toBe(1)
    inc(2)
    expect(current.value).toBe(3)

    dec(1)
    expect(current.value).toBe(2)

    dec(2)
    expect(current.value).toBe(0)

    reset()
    expect(current.value).toBe(10)
    
  })

  test('options', () => {
    const max = 10
    const min = 1
    const { current, inc, dec } = useCounter(0, {max, min})
    expect(current.value).toEqual(min)
    inc(12)
    expect(current.value).toBe(max)
    dec(30)
    expect(current.value).toBe(min)
  })
  
})