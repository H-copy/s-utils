import {
  type,
  isType,
  isString,
  isArray,
  isNumber,
  isBoolean,
  isUndefined,
  isNull,
  isFunction,
  isObject
} from '../index'

test('type', () => {
  expect(type('')).toBe('string')
})

test('type isType', () => {
  expect(isType('', 'string')).toBeTruthy()
})

test('type string', () => {
  expect(isString('show me')).toBeTruthy()
  expect(isString(0)).toBeFalsy()
})

test('type number', () => {
  expect(isNumber(0)).toBeTruthy()
  expect(isNumber({})).toBeFalsy()
})

test('type boolean', () => {
  expect(isBoolean(true)).toBeTruthy()
  expect(isBoolean(false)).toBeTruthy()
  expect(isBoolean(0)).toBeFalsy()
  expect(isBoolean('')).toBeFalsy()
  expect(isBoolean(null)).toBeFalsy()
  expect(isBoolean(undefined)).toBeFalsy()
})

test('type undefined', () => {
  expect(isUndefined(undefined)).toBeTruthy()
  expect(isUndefined(null)).toBeFalsy()
})

test('type isNull', () => {
  expect(isNull(null)).toBeTruthy()
  expect(isNull(undefined)).toBeFalsy()
})

test('type array', () => {
  expect(isArray([])).toBeTruthy()
  expect(isArray({})).toBeFalsy()
})


test('type function', () => {
  expect(isFunction(() => {})).toBeTruthy()
  expect(isFunction(0)).toBeFalsy()
})

test('type function', () => {
  expect(isObject({})).toBeTruthy()
  expect(isObject(0)).toBeFalsy()
})


