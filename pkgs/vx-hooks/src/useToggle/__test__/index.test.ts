import {
  useToggle
} from '../index'


describe('useToggle empty value', () => {

  const {
    state,
    toggle,
    setLeft,
    setRight
  } = useToggle()

  test('init value', () => {
    expect(state.value).toBeFalsy()
  })

  test('setRight', () => {
    setRight()
    expect(state.value).toBeTruthy()
  })

  test('setLeft', () => {
    setLeft()
    expect(state.value).toBeFalsy()
  })

  test('toggle empty', () => {

    setLeft()
    expect(state.value).toBeFalsy()
    
    toggle(true)
    expect(state.value).toBeTruthy()

    toggle(false)
    expect(state.value).toBeFalsy()
    
  })
  
})

describe('useToggle a,b', () => {
  const leftVal = 'a'
  const rightVal = 'b'
  type left = 'a'
  type right = 'b'
  const {
    state,
    toggle,
    setLeft,
    setRight
  } = useToggle<left, right>(leftVal, rightVal)

  test('init value', () => {
    expect(state.value).toBe(leftVal)
  })

  test('setRight', () => {
    setRight()
    expect(state.value).toBe(rightVal)
  })

  test('setLeft', () => {
    setLeft()
    expect(state.value).toBe(leftVal)
  })

  test('toggle', () => {

    setLeft()
    expect(state.value).toBe(leftVal)
    
    toggle(rightVal)
    expect(state.value).toBe(rightVal)

    toggle(leftVal)
    expect(state.value).toBe(leftVal)
    
  })
  
})