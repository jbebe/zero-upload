export function objectEntries<T extends string | number | symbol, K = any>(obj: { [key in T]?: K }){
  return Object.entries<K>(obj).map(([key, item]: [string, K]): [T, K] => [key as T, item])
}

export function convertStringToUint8(data: string){
  const encoder = new TextEncoder()
  return encoder.encode(data)
}

export function convertUint8ToString(data: Uint8Array){
  const decoder = new TextDecoder()
  return decoder.decode(data)
}

