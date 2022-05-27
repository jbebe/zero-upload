import { Bitfield } from "../utils/bitfield"
import { decryptDataAsync, encryptDataAsync } from "../utils/crypto"
import { decodeImageAsync, fuzzyEncodeImageAsync } from "../utils/image"
import { formatSize } from "../utils/size"
import { CompatibilityType, ImageMimeType, UploadRequest, UploadType } from "../utils/types"
import { convertStringToUint8, convertUint8ToString } from "../utils/vanilla-helpers"
import { iFactor, iFactorCompatibility, urlDecode, urlEncode } from "./url-encoder"

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
  compatibility: 1,
  encrypted: 1,
  compressed: 1,
  uploadType: 2,
  _placeholder: 1,
  // if more flags are needed, encoded flag will be 2 characters wide!
}

export class LinkCreator {

  public static async unpackAsync(data: Uint8Array, flags: typeof flagSchema, password?: string): Promise<string> {
    if (flags.uploadType === UploadType.File) throw new Error('File type is not supported')

    if (flags.encrypted)
      data = await decryptDataAsync(password, data, flags.compatibility === 1)

    if (flags.compressed)
      data = LZUTF8.decompress(data, {
        inputEncoding: 'ByteArray',
        outputEncoding: 'ByteArray',
      }) as Uint8Array

    switch (flags.uploadType){
      case UploadType.Text:
        return convertUint8ToString(data)
      case UploadType.Image:
        return await decodeImageAsync(data)
    }
  }

  public static getParts(encodedData: string): [typeof flagSchema, Uint8Array] {
    // flag
    const encodedFlag = urlDecode(encodedData.slice(0, 1), /*compatibility: always*/ true)[0]
    const flags = Bitfield.create(8, flagSchema, encodedFlag)
    
    // data
    encodedData = encodedData.slice(1)
    const data = urlDecode(encodedData, flags.compatibility === 1)
    
    return [flags, data]
  }

  public static compressText(data: Uint8Array): Uint8Array {
    const compressedData = LZUTF8.compress(data, {
      inputEncoding: 'ByteArray',
      outputEncoding: 'ByteArray',
    }) as Uint8Array
    
    return compressedData
  }

  public static async packAsync(request: UploadRequest){
    // Validate & compress if shorter
    const maxUrlLength = LinkCreator.getEffectiveUrlLength(request.compatibility)
    console.log('max url: ', maxUrlLength)
    let data: Uint8Array
    let shouldCompress = false
    switch (request.uploadType){
      case UploadType.Text:
        data = convertStringToUint8(request.textdata)
        const compressedData = LinkCreator.compressText(data)
        shouldCompress = data.byteLength > compressedData.byteLength
        if (shouldCompress){
          data = compressedData
        }
        break
      case UploadType.Image:
        data = await fuzzyEncodeImageAsync(request.imagedata, maxUrlLength)
        break
      case UploadType.File:
        throw new Error(`Unsupported upload type: ${request.uploadType}`)
    }

    // Encrypt if requested
    const encrypted = !!request.password
    if (encrypted)
      data = await encryptDataAsync(request.password, data, request.compatibility === 1)

    // Add flags
    const flags = Bitfield.create(8, flagSchema, {
      compatibility: +request.compatibility,
      encrypted: +encrypted,
      uploadType: +request.uploadType,
      compressed: +shouldCompress,
      _placeholder: 0,
    })
    const flagsFragment = urlEncode(Uint8Array.from([flags + 0]), /*compat: awlays*/ true)

    // URL encode
    if (data.byteLength > maxUrlLength)
      throw new Error(`Url reached maximum length: ${formatSize(data.byteLength)}`)
    const urlEncoded = urlEncode(data, request.compatibility === 1)
    return `${flagsFragment}${urlEncoded}`
  }

  public static getEffectiveUrlLength(urlCompatibility: CompatibilityType){
    const filterCb = (x: typeof browserUrlLengths[number]) => (
      (urlCompatibility === CompatibilityType.None && x.modern) 
      || urlCompatibility !== CompatibilityType.None
    )
    const supportedUrlLength = browserUrlLengths
      .filter(filterCb)
      .map(x => x.length)
      .reduce((prev, curr) => curr < prev ? curr : prev, Infinity)
    const baseUrlLength = location.href.length
    const dataLength = supportedUrlLength - baseUrlLength
    const urlEncodeMultiplier = urlCompatibility === CompatibilityType.Maximum ? iFactorCompatibility : iFactor
    return dataLength / urlEncodeMultiplier
  }
}
