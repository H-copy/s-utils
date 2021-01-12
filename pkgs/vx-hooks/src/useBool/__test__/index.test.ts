import {
  useBool
} from '../index'

let {
  state,
  setTrue,
  setFalse,
  toggle
} = useBool()

beforeEach(() => {
 const d = useBool()
  state = d.state
  setTrue = d.setTrue
  setFalse = d.setFalse
  toggle = d.toggle
})

describe('useBool', () => {

  
  test('init value', () => {
    expect(state.value).toBeFalsy()
  })

  test('setTrue', () => {
    setTrue()
    expect(state.value).toBeTruthy()
  })

  test('setFalse', () => {
    setTrue()
    setFalse()
    expect(state.value).toBeFalsy()
  })

  test('toggle empty', () => {
    expect(state.value).toBeFalsy()
    toggle()
    expect(state.value).toBeTruthy()
    toggle()
    expect(state.value).toBeFalsy()
  })

  test('toggle boolean', () => {
    expect(state.value).toBeFalsy()
    toggle(true)
    expect(state.value).toBeTruthy()
    toggle(false)
    expect(state.value).toBeFalsy()
  })
  
})
