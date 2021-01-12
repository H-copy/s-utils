import {
  pipe,
  curry
} from '../index'


describe('_utils', () => {

  test('pipe', () => {

    const fn1 = jest.fn()
    const fn2 = jest.fn()
    const run = pipe(fn1, fn2)
    run()
    expect(fn1).toBeCalledTimes(1)
    expect(fn2).toBeCalledTimes(1)
    
  })

  test('curry', () => {
    const mockFn = jest.fn()
    const cb = curry((a: any, b: any) => {
      mockFn()
      return [a, b]
    })
    
    let next = cb(1)
    expect(mockFn).not.toBeCalled()
    next = next(2)
    expect(mockFn).toBeCalled()
  })
  
})