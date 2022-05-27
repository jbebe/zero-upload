import BaseX from 'base-x'


const URL_SAFE_ALPHABET = '#!$%&\'()*+,-./0123456789:;=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}~'
const URL_SAFE_ALPHABET_COMPATIBILITY = '#!$&\'*+-./0123456789:;=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]_abcdefghijklmnopqrstuvwxyz~'
const BS90 = BaseX(URL_SAFE_ALPHABET)
const BS90Compatibility = BaseX(URL_SAFE_ALPHABET_COMPATIBILITY)

export const iFactor = Math.log(256) / Math.log(URL_SAFE_ALPHABET.length) // shows the increase in length from the input data
export const iFactorCompatibility = Math.log(256) / Math.log(URL_SAFE_ALPHABET_COMPATIBILITY.length)

export function urlEncode(data: Uint8Array, compatibility: boolean){
  return (compatibility ? BS90Compatibility : BS90).encode(data)
}

export function urlDecode(data: string, compatibility: boolean){
  return (compatibility ? BS90Compatibility : BS90).decode(data)
}
