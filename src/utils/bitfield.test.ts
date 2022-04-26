import '@jest/globals'
import bitfield, { byte, uint } from './bitfield'

test('bitfields work as intended', () => {
  const bf = bitfield.create(byte)
    .prop('foo', 1, true)
    .prop('bar', 2, uint, 3)
    .prop('baz', 3, false)
    .get()
  
  expect(bf.foo).toBe(true)
  expect(bf.bar).toBe(3)
  expect(bf.baz).toBe(false)
})