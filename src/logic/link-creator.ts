import { CompatibilityType, UploadRequest, UploadType } from "../utils/types";
import { urlEncode } from "./url-encoder";

const browserUrlLengths = [
  { name: 'Chrome', modern: true, length: 2_097_152 },
  { name: 'Firefox', modern: true, length: 65_536 },
  { name: 'Internet Explorer', modern: false, length: 2083 },
  { name: 'Opera', modern: false, length: 2_097_152 },
  { name: 'Safari', modern: true, length: 80_000 },
]

export class LinkCreator {
  constructor(
    private request: UploadRequest
  ){
  }

  public async getAsync(){
    if (this.request.uploadType !== UploadType.Text) throw new Error('Unsupported upload type')

    const urlLength = LinkCreator.getUrlLength(this.request.compatibility);
    let data = LinkCreator.convertStringToUint8(this.request.textdata);
    if (this.request.password)
      data = await LinkCreator.encryptDataAsync(data)
    
    return urlEncode(data)
  }

  private static async encryptDataAsync(data: Uint8Array) {
    const iv = window.crypto.getRandomValues(new Uint8Array(16))
    const key = window.crypto.getRandomValues(new Uint8Array(16))
    const key_encoded = await crypto.subtle.importKey(  "raw",    key.buffer,   'AES-CTR' ,  false,   ["encrypt", "decrypt"])
    const counter = window.crypto.getRandomValues(new Uint8Array(16))
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      key_encoded,
      data
    )

    return encryptedData as Uint8Array
  }

  private static convertStringToUint8(data: string){
    const encoder = new TextEncoder()
    return encoder.encode(data)
  }

  private static async getFileContentAsync(file: File) {
    return await file.arrayBuffer()
  }

  public static getUrlLength(urlCompatibility: CompatibilityType){
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