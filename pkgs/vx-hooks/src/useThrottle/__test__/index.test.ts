import { ref } from 'vue'
import { dely } from '../../_utils'
import { useThrottle } from '../index'

describe('useThrottle', () => {

  test('set state', async () => {
    const watchVal = ref(0)
    const { state } = useThrottle<number>(watchVal)
    expect(state.value).toBe(0)
    
    watchVal.value = 1
    
    await dely(1)
    expect(state.value).toBe(1)
    
  })
  
})