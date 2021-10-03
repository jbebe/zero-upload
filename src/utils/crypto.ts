import CryptoJS from 'crypto-js';
import { EncryptedData } from '../types/EncryptedData';
import { baseUrlDecode, baseUrlEncode } from './encoding';
import { getFileContentAsync } from "./file";
import { toggleEndianness32 } from './system';
type WordArray = CryptoJS.lib.WordArray;

const iv   = CryptoJS.enc.Hex.parse('0123456789abcdef0123456789abcdef');

enum IntegerSize { 
  BYTE = 1,
  WORD = 2,
  DWORD = 4,
  QWORD = 8,
};

export async function encryptFileAsync(file: File, password: string): Promise<string> {
  const content = await getFileContentAsync(file);
  //console.log(file.name, file.type, file.size, file.lastModified, content);
  
  // TODO: try compression for smaller file size
  const wordArray = convertArrayBufferToWordArray(content);
  const key = CryptoJS.MD5(password);
  const cipher = CryptoJS.AES.encrypt(wordArray, key, { iv });
  
  // url encode
  //console.log(`enc from:  ${cipher.toString(CryptoJS.format.Hex)}`);
  //console.log(`enc int32: ${Array.from(convertInt32ToUint8Array(cipher.ciphertext)).map(x => ('0' + x.toString(16)).slice(-2)).join('')}`);
  const baseUrlCipher = baseUrlEncode(convertInt32ToUint8Array(cipher.ciphertext));

  // assert check
  //console.log(`enc to:    ${Array.from(baseUrlDecode(baseUrlCipher)).map(x => ('0' + x.toString(16)).slice(-2)).join('')}`);
  //console.log(`original cipher: ${cipher.ciphertext.toString(CryptoJS.enc.Base64)}`);
  //const newCipherString = convertUint8ToInt32Array(baseUrlDecode(baseUrlCipher)).toString(CryptoJS.enc.Base64);
  //console.log(`decoded cipher:  ${newCipherString}`);
  //const cipherParams = CryptoJS.lib.CipherParams.create({
  //  ciphertext: CryptoJS.enc.Base64.parse(newCipherString)
  //});
  //console.log(`out: [${CryptoJS.AES.decrypt(cipherParams, key, { iv }).toString(CryptoJS.enc.Utf8)}]`);
  
  const encodedFilename = new TextEncoder().encode(file.name);
  return `${baseUrlEncode(encodedFilename)}${EncryptedData.Separator}${baseUrlCipher}`;
}

export function decryptFile(hash: string, password: string): [string, Blob] {
  const [encodedFilename, cipher] = hash.split(EncryptedData.Separator, 2);
  const key = CryptoJS.MD5(password);
  const newCipherString = convertUint8ToInt32Array(baseUrlDecode(cipher)).toString(CryptoJS.enc.Base64);
  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(newCipherString)
  });
  const decryptedFile = CryptoJS.AES.decrypt(cipherParams, key, { iv });
  
  const filename = new TextDecoder().decode(baseUrlDecode(encodedFilename));

  return [filename, new Blob([convertInt32ToUint8Array(decryptedFile).buffer])];
}

function convertArrayBufferToWordArray(content: ArrayBuffer): WordArray {
  const [paddedContent, dwordLength] = roundBuffer(new Uint8Array(content), IntegerSize.DWORD);
  const contentView = new DataView(paddedContent.buffer);
  const numArrayContent: number[] = new Array(dwordLength);

  for (let i = 0; i < dwordLength; ++i){
    const offset = i * 4;
    const littleEndian = false;
    numArrayContent[i] = contentView.getInt32(offset, littleEndian);
  }
  
  return CryptoJS.lib.WordArray.create(numArrayContent, content.byteLength);
}

function convertInt32ToUint8Array(int32Words: WordArray): Uint8Array {
  const endianSwappedWords = int32Words.words.map(toggleEndianness32);
  const view = new DataView(new Uint32Array(endianSwappedWords).buffer);
  const result = new Uint8Array(view.byteLength);
  for (let i = 0; i < view.byteLength; ++i){
    result[i] = view.getInt8(i);
  }

  return result;
}

function convertUint8ToInt32Array(bytes: Uint8Array): WordArray {
  const [paddedContent, ] = roundBuffer(bytes, IntegerSize.DWORD);
  const view = new DataView(paddedContent.buffer);
  const words = [];
  
  for (let i = 0; i < bytes.length; i += 4){
    words.push(view.getInt32(i));
  }

  return CryptoJS.lib.WordArray.create(words, bytes.length);
}

function roundBuffer(array: Uint8Array, intSize: IntegerSize): [Uint8Array, number] {
  const newLength = Math.ceil(array.length / intSize);
  const paddedByteLength = newLength * intSize;
  const paddedContent = new Uint8Array(paddedByteLength);
  paddedContent.set(array);

  return [paddedContent, newLength];
}
