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

export async function loadFileAsync(file: File): Promise<ArrayBuffer> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onabort = () => reject()
    reader.onerror = () => reject()
    reader.onload = () => {
      const binaryStr = reader.result as ArrayBuffer
      resolve(binaryStr)
    }
    reader.readAsArrayBuffer(file)
  })
}