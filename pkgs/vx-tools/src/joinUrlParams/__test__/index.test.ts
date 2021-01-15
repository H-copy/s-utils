import { joinUrlParams } from '../index'

test('url params', () => {

  const URL = 'www.baidu.com'
  const params = {
    id: '12',
    userName: 'coco'
  }
  expect(joinUrlParams(URL, params)).toBe('www.baidu.com?id=12&userName=coco')
})
