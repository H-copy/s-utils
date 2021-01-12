import {
  useMap
} from '../'

describe('useMap', () => {

  const {
    map,
    get,
    set,
    setAll,
    remove,
    reset,
    resetInit
  } = useMap<string, number>([
    ['0', 0]
  ])

  test('init value', () => {
    expect(map.value.get('0')).toBe(0)
  })

  test('get', () => {
    expect(get('0')).toBe(0)
  })

  test('set', () => {
    set('1', 1)
    expect(get('1')).toBe(1)
  })

  test('remove', () => {
    remove('1')
    expect(map.value.has('1')).toBeFalsy()
  })
  
  
  test('setAll', () => {
    setAll([['2', 2]])
    expect(get('2')).toBe(2)
  })

  test('reset', () => {
    reset()
    expect(get('0')).toBe(0)
    expect(map.value.size).toBe(1)
  })

  test('resetInit', () => {
    resetInit([['3', 3]])
    reset()
    expect(map.value.get('3')).toBe(3)
  })
  
})