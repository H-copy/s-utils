import { ref } from 'vue'
import { useDebounce } from '../index'
import { dely } from '../../_utils'

describe('useDebounc', () => {

  test('change state 0 -> 10', async () =>{
    const watchState = ref(0)
    const wait = 1
    const { state } = useDebounce(watchState, wait)
    expect(state.value).toBe(watchState.value)

    for(let i = 1; i <= 10; i++){
      watchState.value = i
      expect(state.value).toBe(0)
    }
    
    await dely(1.001)
    console.log('check', state.value)
    expect(state.value).toBe(10)
    
  })
  
})