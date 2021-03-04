import { test } from '@jest/globals'
import  { TestClass } from '../../dist/observer/observer.test'

test('can on and fire', () => {
  const testObj = new TestClass()
  let count = 0
  testObj.on('inc', e => {
    count++
  })
  testObj.on('dev', e => {
    count++
  })
  testObj.inc() // +1
  testObj.inc() // +1
  testObj.inc() // +1
  testObj.dec() // +1
  testObj.dec() // +1
  expect(count).toBe(5)
})

test('can off', () => {
  const testObj = new TestClass()
  let count = 0
  const handler = testObj.on('inc', e => {
    count++
  })
  testObj.on('dev', e => {
    count++
  })
  testObj.inc() // +1
  testObj.inc() // +1
  handler.remove()
  testObj.dec() // +1
  testObj.inc()
  testObj.dec() // +1
  expect(count).toBe(4)
})

test('can off all', () => {
  const testObj = new TestClass()
  let count = 0
  testObj.on('inc', e => {
    count++
  })
  testObj.on('inc', e => {
    count++
  })
  testObj.on('dev', e => {
    count++
  })
  testObj.inc() // +2
  testObj.dec() // +1
  testObj.off('inc')
  testObj.inc()
  testObj.inc()
  testObj.dec() // +1
  expect(count).toBe(4)
})

test('off and off again', () => {
  const testObj = new TestClass()
  let count = 0
  const handler = testObj.on('inc', e => {
    count++
  })
  testObj.off('inc')
  handler.remove()
  testObj.inc()
  expect(count).toBe(0)
})

test('on only once', () => {
  const testObj = new TestClass()
  let count = 0
  const handler = testObj.on('inc', e => {
    count++
    handler.remove()
  })
  testObj.inc()
  testObj.inc()
  expect(count).toBe(1)
})
