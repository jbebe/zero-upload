import { Bitfield } from "../utils/bitfield";
import { decryptDataAsync, encryptDataAsync } from "../utils/crypto";
import { CompatibilityType, UploadRequest, UploadType } from "../utils/types";
import { convertStringToUint8, convertUint8ToString } from "../utils/vanilla-helpers";
import { urlDecode, urlEncode } from "./url-encoder";

declare var LZUTF8: any

const browserUrlLengths = [
  { name: 'Chrome', modern: true, length: 2_097_152 },
  { name: 'Firefox', modern: true, length: 65_536 },
  { name: 'Internet Explorer', modern: false, length: 2083 },
  { name: 'Edge', modern: false, length: 2083 },
  { name: 'Opera', modern: false, length: 2_097_152 },
  { name: 'Safari', modern: true, length: 80_000 },
]

const flagSchema = {
  encrypted: 1,
  compressed: 1,
  uploadType: 2,
}

export class LinkCreator {

  public static async unpackAsync(data: Uint8Array, flags: typeof flagSchema, password?: string): Promise<string> {
    if (flags.encrypted)
      data = await decryptDataAsync(password, data)

    if (flags.compressed)
      data = LZUTF8.decompress(data, {
        inputEncoding: 'ByteArray',
        outputEncoding: 'ByteArray',
      }) as Uint8Array

    return convertUint8ToString(data)
  }

  public static getParts(encodedData: string): [typeof flagSchema, Uint8Array] {
    const pack = urlDecode(encodedData)
    const flags = Bitfield.create(8, flagSchema, pack[0])
    const data = pack.slice(1)
    return [flags, data]
  }

  public static async packAsync(request: UploadRequest){
    // Validate
    if (request.uploadType !== UploadType.Text) throw new Error('Unsupported upload type')

    const maxUrlLength = LinkCreator.getEffectiveUrlLength(request.compatibility);
    let data = convertStringToUint8(request.textdata);
    
    // Compress if shorter
    const compressedData = LZUTF8.compress(data, {
      inputEncoding: 'ByteArray',
      outputEncoding: 'ByteArray',
    }) as Uint8Array
    let shouldCompress = data.byteLength > compressedData.byteLength
    if (shouldCompress){
      data = compressedData
    }

    // Encrypt if requested
    const encrypted = !!request.password
    if (encrypted)
      data = await encryptDataAsync(request.password, data)

    // Add flags
    const flags = Bitfield.create(8, flagSchema, {
      encrypted: +encrypted,
      uploadType: +request.uploadType,
      compressed: +shouldCompress
    })
    data = Uint8Array.from([flags + 0, ...Array.from(data)])

    // URL encode
    const urlEncoded = urlEncode(data)
    if (urlEncoded.length > maxUrlLength){
      throw new Error('Url reached maximum length')
    }

    return urlEncoded
  }

  private static async getFileContentAsync(file: File) {
    return await file.arrayBuffer()
  }

  public static getEffectiveUrlLength(urlCompatibility: CompatibilityType){
    const baseUrlLength = location.href.length
    const filterCb = (x: typeof browserUrlLengths[number]) => (
      (urlCompatibility === CompatibilityType.Modern && x.modern) 
      || urlCompatibility !== CompatibilityType.Modern
    )
    
    return browserUrlLengths
      .filter(filterCb)
      .map(x => x.length)
      .reduce((prev, curr) => curr > prev ? curr : prev, 0) - baseUrlLength
  }
}