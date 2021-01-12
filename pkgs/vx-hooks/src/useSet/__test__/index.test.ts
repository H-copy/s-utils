import {
  useSet
} from '../index'

describe('useSet', () => {
  const a = 'a'
  const {
    set,
    add,
    remove,
    reset,
    setInit,
    update
  } = useSet<string>([a])
  
  test('init value', () => {
    expect(set.value).toContain(a)
  })

  test('add', () => {
    const b = 'b'
    add(b)
    expect(set.value).toContain(b)
  })

  test('remove', () => {
    const b = 'b'
    remove(b)
    expect(set.value).not.toContain(b)
  })

  test('reset', () => {
    remove(a)
    reset()
    expect(set.value).toContain(a)
  })

  test('setInit', () => {
    const init = ['c']
    setInit(init)
    reset()
    expect(set.value).toContain('c')
  })

  test('update', () => {
    const init = ['a', 'b', 'c']
    update(init)
    expect(set.value).toContain('a')
    expect(set.value).toContain('b')
    expect(set.value).toContain('c')
    expect([...set.value]).toHaveLength(3)
  })

  

})