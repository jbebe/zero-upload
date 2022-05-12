import '@jest/globals'
import { Bitfield } from './bitfield'

describe('Test pre-created 8 bit schema', () => {
  let bf: {
    foo: number
    bar: number
    baz: number
  } & number

  beforeEach(() => {
    bf = Bitfield.create(8, {
      foo: 1,
      bar: 6,
      baz: 1,
    })
  });

  test('field write', () => {
    bf.foo = 1
    bf.bar = 0b111111
    bf.baz = 1
    
    expect(bf.foo).toBe(1)
    expect(bf.bar).toBe(0b111111)
    expect(bf.baz).toBe(1)
  })
  
  test('implicit conversion to native (number) type', () => {
    bf.foo = 1
    bf.bar = 0b111111
    bf.baz = 1
    
    const arr = new Uint8Array(1);
    arr[0] = bf;
    expect(arr[0]).toBe(255)
  })

  test('arithmetic operations implicitly convert bitfields to number', () => {
    bf.foo = 1
    bf.bar = 0b111111
    bf.baz = 1
    
    expect(bf + 0).toBe(255)
  })

})

test('loading a data struct and accessing specific fields', () => {
  const bf = Bitfield.create(8, { foo: 1, bar: 6, baz: 1 }, { foo: 1, bar: 0b111111, baz: 1 })
  
  expect(bf + 0).toBe(255)
})

test('loading a number and accessing specific fields', () => {
  const num = 0b10010001
  const bf = Bitfield.create(8, { foo: 1, bar: 6, baz: 1 }, num)
  
  expect(bf + 0).toBe(num)
})
