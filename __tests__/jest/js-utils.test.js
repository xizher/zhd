/* eslint-disable no-undef */
import { baseUtils } from '../../dist/js-utils'

test('deepCopyJSON: can run true', () => {

  const obj = {
    a: 1, b: '2', c: '', d: false, e: {}, f: () => 1, g: null, h: class {}
  }
  const newObj = baseUtils.deepCopyJSON(obj)

  expect(newObj !== obj).toBe(true)
  expect(newObj.a).toBe(1)
  expect(newObj.b).toBe('2')
  expect(newObj.c === '').toBe(true)
  expect(newObj.d).toBe(false)
  expect(typeof newObj.e).toBe('object')
  expect(typeof newObj.f === 'undefined').toBe(true)
  expect(newObj.g === null).toBe(true)
  expect(typeof newObj.h === 'undefined').toBe(true)
})

test('deepCopy: can run true', () => {

  const obj = {
    a: 1, b: '2', c: '', d: false, e: {}, f: () => 1, g: null, h: class {}
  }
  const newObj = baseUtils.deepCopy(obj)

  expect(newObj !== obj).toBe(true)
  expect(newObj.a).toBe(1)
  expect(newObj.b).toBe('2')
  expect(newObj.c === '').toBe(true)
  expect(newObj.d).toBe(false)
  expect(typeof newObj.e).toBe('object')
  expect(newObj.f()).toBe(1)
  expect(newObj.g === null).toBe(true)
  expect(typeof newObj.h).toBe('function')
})

test('createGuid: can run true', () => {
  const guid = baseUtils.createGuid()
  expect(guid.length).toBe(36)
})

test('createIntRandom: can run true', () => {
  const num = baseUtils.createIntRandom(0, 1)
  expect(num === 1 || num === 0).toBe(true)
})


test('$extend: can run true', () => {
  const obj = { a: 1, b: { b1: 2 } }
  baseUtils.$extend(true, obj, {
    c: 2, b: { b2: 3 }
  })
  expect(obj.a).toBe(1)
  expect(obj.c).toBe(2)
  expect(obj.b.b1).toBe(2)
  expect(obj.b.b2).toBe(3)
})
