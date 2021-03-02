import {
  useDebounceFn
} from '../index'
import {
  dely
} from '../../_utils'


describe('useDebounceFn', () =>{

  test('in 2s, 3 times', async () => {
    const cb = jest.fn()
    const wait = 1
    const { run } = useDebounceFn(cb, wait)

    run(1)
    run(2)
    run(3)

    await dely(wait/2)
    expect(cb.mock.calls.length).toBe(0)

    await dely(wait/2)
    expect(cb.mock.calls.length).toBe(1)
    
  })

  test('cancel', async () => {
    const cb = jest.fn()
    const wait = 1
    const { run, cancel } = useDebounceFn(cb, wait)
    run()

    await dely(wait/2)
    cancel()
    await dely(wait/2)
    expect(cb.mock.calls.length).toBe(0)
    
  })

  test('repeat', async () => {
    const cb = jest.fn()
    const wait = 1
    const { run } = useDebounceFn(cb, wait)
    
    run()
    await dely(wait)
    expect(cb.mock.calls.length).toBe(1)

    run()
    await dely(wait)
    expect(cb.mock.calls.length).toBe(2)
  })
})