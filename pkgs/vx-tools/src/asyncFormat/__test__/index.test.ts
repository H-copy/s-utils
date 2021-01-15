import {
  asyncFormat
} from '../index'


function buildAPI(callback:() => any, isFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isFail ? reject(callback()) : resolve(callback())
    }, 0)
  })
}


describe('asyncFormat', () => {

  test('success',   async () => {
    const [res, __] = await asyncFormat(buildAPI(() => 'SUCCESS'))
    expect(res).toBe('SUCCESS')
  })

  test('fail', async () => {
    const [__, err] = await asyncFormat(buildAPI(() => 'FAIL', true))
    expect(err).toBe('FAIL')
  })
  
})