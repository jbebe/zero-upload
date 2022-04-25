import scrypt from "scrypt-async"

export async function encryptDataAsync(password: string, data: Uint8Array) {
  // random iv
  const iv = window.crypto.getRandomValues(new Uint8Array(16))
  // derive key from password
  const key = await deriveKeyAsync(password, iv)
  const keyObj = await crypto.subtle.importKey('raw', key.buffer, 'AES-GCM', false, ['encrypt', 'decrypt'])
  // encrypt data
  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv
    },
    keyObj,
    data
  )
  return new Uint8Array(encryptedData)
}

async function deriveKeyAsync(password: string, iv: Uint8Array): Promise<Uint8Array> {
  const salt = Array.from(iv)
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
  });
}