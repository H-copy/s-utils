import { delay } from '../index'

const SECOND = 1000
async function _setTimeout(time: number, cb?: () => any) {
  await delay(time, cb)
  // 在 delay 执行回调， jest toBeCalled 无法捕获回调执行信息  
}

afterEach(() => {
  jest.useRealTimers();
});

test('delay 1s', () => {
  jest.useFakeTimers()
  _setTimeout(1)
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)
})


test('delay callback', () => {
  jest.useFakeTimers()
  const callback = jest.fn()
  _setTimeout(SECOND, callback)

  jest.runAllTimers();
  
  expect(callback).toBeCalled()
  expect(callback).toHaveBeenCalledTimes(1)
})