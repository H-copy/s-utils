import { objectFilter } from '../index'

test('objectFilter extract', () => {
  const source = {
    id: 111,
    name: 'jack',
    children: [{ id: 112, name: 'jack ma' }]
  }
  const keys = ['id', 'name'] as (keyof typeof source)[]

  expect(objectFilter(keys, source)).toMatchObject({ id: 111, name: 'jack' })
  
})


test('objectFilter shadow', () => {
  const child = {
    id: 112,
    name: 'jack'
  }

  const source = {
    id: 111,
    name: 'jack',
    child,
  }
  const keys = ['id', 'name', 'child'] as (keyof typeof source)[]

  expect(objectFilter(keys, source).child).toBe(child)
  
})