import { Clock } from '../index'

describe('工具函数 utils/tool/clock', () => {
  // jest.useFakeTimers()
  let c = Clock.create()

  beforeEach(() => {
    c = Clock.create()
  })
  
  test('初始化，并记录3段时间', () => {
    c.tick()
    c.tick()
    c.tick()

    const times = c._getTimes()
    expect(times.length).toBe(3)
  })

  test('1s 间隔记录', () => {
    c.tick()
    setTimeout(() => {
      c.tick()
      const t = c.firstTick() / 1000
      expect(t).toBe(1)
    }, 1000)
  })

  test('1s 间隔多端记录, 首尾记录 firstTick, lastTick', () => {
    const timeList = [1, 2, 3, 1]

    c.tick()
    timeList.forEach(t => {
      setTimeout(() => {
        c.tick()
      }, t * 1000)
    })

    setTimeout(() => {
      const first = c.firstTick() / 1000
      const last = c.lastTick() / 1000
      
      expect(first).toBe(timeList.shift())
      expect(last).toBe(timeList.pop())
    }, 4 * 1000)

  })

  test('1s 间隔多端记录, 迭代 nextTick', () => {
    // 测试列表需为递进，保证tick的执行顺序.
    const timeList = [1, 2, 3, 4]
    c.tick()
    timeList.forEach(t => {
      setTimeout(() => {
        c.tick()
      }, t * 1000)
    })

    setTimeout(() => {

      let t = c.nextTick()

      while (t !== Clock.END) {
        expect(t).toBe(1000) 
        t = c.nextTick()
      }
  
      c.resetTick()
      expect(c.nextTick()).toBe(c.firstTick())
      
    }, 5 * 1000)
  })
  

  test('1s 间隔多端记录, [1, 3]跨段记录 getTick', () => {
    // 测试列表需为递进，保证tick的执行顺序.
    const timeList = [1, 2, 3, 4]
    const s = 0
    const e = 2

    c.tick()
    timeList.forEach(t => {
      setTimeout(() => {
        c.tick()
      }, t * 1000)
    })
    
    setTimeout(() => {
      const t = c.getTick(s, e) / 1000
      const i = 2
      expect(t).toBe(i)
    }, 5 * 1000)
  
  })

})