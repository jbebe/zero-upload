import scrypt from "scrypt-async"

const Algorithm = [
  {
    name: 'AES-GCM',
    iv: window.crypto.getRandomValues(new Uint8Array(16)),
    getEncryptedResult(data: any){
      return new Uint8Array([...this.iv, ...Array.from(new Uint8Array(data))])
    },
    getConfig(iv?: Uint8Array){
      iv ??= this.iv
      return {
        name: "AES-GCM",
        iv,
      }
    },
    getParts: (data: Uint8Array) => [data.slice(0, 16), data.slice(16)]
  },
  { 
    name: 'AES-CTR', 
    // iv: zero bytes because we won't send it, we won't be able to recover it
    iv: new Uint8Array(16),
    getEncryptedResult: (data: any) => new Uint8Array(data),
    getConfig(iv?: Uint8Array){ 
      iv ??= this.iv
      return {
        name: 'AES-CTR',
        counter: iv,
        length: 8 * iv.byteLength,
      }
    },
    getParts: (data: Uint8Array) => [undefined, data]
  },
]

export async function encryptDataAsync(password: string, data: Uint8Array, compatibility: boolean) {
  const algorithm = Algorithm[+compatibility]
  const key = await deriveKeyAsync(password)
  const keyObj = await crypto.subtle.importKey('raw', key.buffer, algorithm.name, false, ['encrypt', 'decrypt'])
  const encryptedData = await window.crypto.subtle.encrypt(
    algorithm.getConfig(),
    keyObj,
    data
  )
  return algorithm.getEncryptedResult(encryptedData)
}

export async function decryptDataAsync(password: string, packedData: Uint8Array, compatibility: boolean) {
  const algorithm = Algorithm[+compatibility]
  const key = await deriveKeyAsync(password)
  const keyObj = await crypto.subtle.importKey('raw', key.buffer, algorithm.name, false, ['encrypt', 'decrypt'])
  const [iv, data] = algorithm.getParts(packedData)
  const encryptedData = await window.crypto.subtle.decrypt(
    algorithm.getConfig(iv),
    keyObj,
    data
  )
  return new Uint8Array(encryptedData)
}

async function deriveKeyAsync(password: string): Promise<Uint8Array> {
  const salt = Array.from(new Uint8Array(0))
  return new Promise((resolve, reject) => {
    try {
      scrypt(password, salt, {
        N: 16384,
        r: 8,
        p: 1,
        dkLen: 16,
        encoding: 'binary'
      }, (derivedKey) => {
        if (!derivedKey) throw new Error('Derived key is empty')
        resolve(derivedKey as unknown as Uint8Array)
      })
    } catch (ex){
      reject(ex)
    }
  })
}