import BaseX from 'base-x'

const URL_SAFE_ALPHABET = '#!$%&\'()*+,-./0123456789:;=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}~'
const BS90 = BaseX(URL_SAFE_ALPHABET)

export function urlEncode(data: Uint8Array){
  return BS90.encode(data)
}

export function urlDecode(data: string){
  return BS90.decode(data)
}