import { useSetRef } from '../index'

describe('useSetRef', () => {

  test('set value', () => {
    const valList = [
      0,
      '',
      undefined,
      null,
      [1, 2],
      {name: 'coco'}
    ]
    const { state, setState } = useSetRef<any>(0)

    valList.map(item => {
      setState(item)
      expect(state.value).toStrictEqual(item)
    })
  })
  
})