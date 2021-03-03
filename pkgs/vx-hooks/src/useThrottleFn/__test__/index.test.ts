import { useThrottleFn } from '../index'
import {
  dely
} from '../../_utils'

describe('useThrottleFn', () => {

  test('time line', async () => {
    const cb = jest.fn()
    const wait = 2
    const { run } = useThrottleFn(cb, wait)

    run()
    await dely(wait * 0.9)
    run()
    await dely(wait * 0.1)
    expect(cb.mock.calls.length).toBe(1)
  })

  
  test('cancel', async () => {
    const cb = jest.fn()
    const wait = 2
    const { run, cancel } = useThrottleFn(cb, wait)

    run()
    cancel()
    await dely(wait)
    expect(cb.mock.calls.length).toBe(0)
  })
})