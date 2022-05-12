type BitSet = Record<string, number>
type BitFieldSize = 8 | 16 | 32

const mask = (bits: number) => (1 << bits) - 1
const Bitfield_size = Symbol('Bitfield_size')
const Bitfield_schema = Symbol('Bitfield_schema')
const Bitfield_data = Symbol('Bitfield_data')
const Bitfield_value_fn = Symbol('Bitfield_value_fn')
const Bitfield_init_fn = Symbol('Bitfield_init_fn')
const bitFieldSymbols = [
  Symbol.toPrimitive,
  Bitfield_data,
  Bitfield_schema,
  Bitfield_size,
  Bitfield_value_fn,
  Bitfield_init_fn,
]

export class Bitfield implements ProxyHandler<BitSet> {
  private [Bitfield_data]: BitSet = {}
  private [Bitfield_size]: BitFieldSize
  private [Bitfield_schema]: BitSet
  
  constructor(size: BitFieldSize, schema: BitSet, data?: BitSet | number){
    this[Bitfield_size] = size
    this[Bitfield_schema] = {...schema}
    if (data){
      this[Bitfield_init_fn](data)
    }
    else {
      for (const prop in schema){
        this[Bitfield_data][prop] = 0
      }
    }
  }
  
  static create<T extends BitSet>(size: BitFieldSize, schema: T, data?: T | number): T & number {
    const bf = new Bitfield(size, schema, data)
    const proxy = new Proxy({} as T, bf)
    return proxy as unknown as (T & number)
  }

  get(_: undefined, propName: string | symbol, __: undefined): number | (() => number) {
    if (bitFieldSymbols.includes(propName as symbol))
      return (this as any)[propName]
    if (typeof propName === 'symbol')
      throw new Error(`Unknown symbol access: ${propName.toString()}`)

    if (!(propName in this[Bitfield_schema]))
      throw new Error(`Property '${propName}' not found in schema`)

    return this[Bitfield_data][propName]
  }
  
  set(_: undefined, propName: string, value: any, __: undefined): boolean {
    if (typeof value !== 'number')
      throw new Error('Bitfield value must be a number')
    if (value < 0)
      throw new Error('Bitfield cannot store negative values')
    const size = this[Bitfield_schema][propName]
    if (value >= (1 << size))
      throw new Error(`Value '${value}' is too big to be represented on ${size} bits`)

    this[Bitfield_data][propName] = value
    return true
  }

  apply(_: BitSet, __: any, ___: any[]) {
    return this[Bitfield_value_fn]()
  }
  
  private [Bitfield_value_fn]() {
    let result = 0
    for (const prop in this[Bitfield_schema]){
      const size = this[Bitfield_schema][prop]
      const value = this[Bitfield_data][prop]
      result = (result << size) | (value & mask(size))
    }
    return result & mask(this[Bitfield_size])
  }

  public [Bitfield_init_fn](data?: BitSet | number) {
    if (typeof data === "number"){
      if (data > mask(this[Bitfield_size]))
        throw new Error('Number is bigger than the schema size')

      let num = data & mask(this[Bitfield_size])
      for (const prop of Object.keys(this[Bitfield_schema]).reverse()){
        const size = this[Bitfield_schema][prop]
        this[Bitfield_data][prop] = num & mask(size)
        num = num >> size
      }
    } 
    else {
      this[Bitfield_data] = {...data}
    }
  }
  
  [Symbol.toPrimitive](): number {
    return this[Bitfield_value_fn]()
  }
}

Bitfield.prototype.valueOf = function(){
  return (this as Bitfield)[Bitfield_value_fn]() as number
}
