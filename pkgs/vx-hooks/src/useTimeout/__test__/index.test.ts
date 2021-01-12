import {
  // useTimeLoop,
  useTimeout
} from '../index'

const SECOND = 1000
let callback = jest.fn()
let { run, stop, isRun, setCallback } = useTimeout(callback, 1)


beforeEach(() => {
  callback = jest.fn()
  const d = useTimeout(callback, 1)
  run = d.run
  stop = d.stop
  isRun = d.isRun
  setCallback = d.setCallback
})

describe('useTimeout', () => {

  test('call', () => {
    jest.useFakeTimers()
    run()
    jest.runAllTimers();
    
    expect(callback).toBeCalled()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('timeout', () => {
    jest.useFakeTimers()
    run()
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), SECOND)
  })

  test('status', () => {
    
    setCallback(() => {
      expect(isRun.value).toBeFalsy()
    })
    
    run()
    expect(isRun.value).toBeTruthy()
    
  })

  test('stop', () => {
    jest.useFakeTimers()
    run()
    stop()
    expect(isRun.value).toBeFalsy()
    jest.runAllTimers()
    expect(callback).not.toBeCalled()
  })

  test('stop', () => {
    const newcb = jest.fn()
    setCallback(newcb)
    jest.useFakeTimers()
    run()
    jest.runAllTimers()
    expect(callback).toBeCalled()
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), SECOND)
  })
  

})