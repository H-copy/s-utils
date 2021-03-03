import { ref } from 'vue'
import { useDebounce } from '../index'
import { dely } from '../../_utils'

describe('useDebounc', () => {

  test('change state 0 -> 10', async () =>{
    const initVal = 0
    const targeVal = 10
    const watchState = ref(initVal)
    const wait = 1
    const { state } = useDebounce(watchState, wait)
    expect(state.value).toBe(watchState.value)

    for(let i = 1; i <= targeVal; i++){
      watchState.value = i
    }
    
    expect(state.value).toBe(0)
    expect(watchState.value).toBe(targeVal)
    
    await dely(wait)
    expect(state.value).toBe(targeVal)
  })

  test('cancel', async () => {
    const initVal = 0
    const targeVal = 10
    const watchState = ref(initVal)
    const wait = 1
    const { state, cancel } = useDebounce(watchState, wait)

    watchState.value = targeVal
    
    await dely(wait / 2)
    expect(state.value).toBe(initVal)
    cancel()
    await dely(wait / 2)
    expect(state.value).toBe(initVal)

    watchState.value = 100
    await dely(wait)
    expect(state.value).toBe(100)
    
  })

  
  test('watchStop', async () => {
    const initVal = 0
    const targeVal = 10
    const watchState = ref(initVal)
    const wait = 1
    const { state, watchStop } = useDebounce(watchState, wait)

    watchStop()
    watchState.value = targeVal
    
    await dely(wait * 2)
    expect(state.value).toBe(initVal)
  })
  
})