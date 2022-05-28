export function decodeFile(data: Uint8Array) {
  const blob = new Blob([data], { type: 'application/data' })
  const url = URL.createObjectURL(blob)
  return url
}

export async function loadFileAsync(file: File): Promise<Uint8Array> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onabort = (ev: ProgressEvent<FileReader>) => reject(ev)
    reader.onerror = (ev: ProgressEvent<FileReader>) => reject(ev)
    reader.onload = () => {
      const binaryStr = reader.result as ArrayBuffer
      resolve(new Uint8Array(binaryStr))
    }
    reader.readAsArrayBuffer(file)
  })
}
