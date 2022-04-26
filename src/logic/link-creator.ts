import { encryptDataAsync } from "../utils/crypto";
import { CompatibilityType, UploadRequest, UploadType } from "../utils/types";
import { convertStringToUint8, convertUint8ToString } from "../utils/vanilla-helpers";
import { urlDecode, urlEncode } from "./url-encoder";

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

  public static decode(hash: string){
    const data = urlDecode(hash)
    return convertUint8ToString(data)
  }

  public async getAsync(){
    if (this.request.uploadType !== UploadType.Text) throw new Error('Unsupported upload type')

    const flags = {
      compressed: true,
      encrypted: true,
      uploadType: 
    }
    const urlLength = LinkCreator.getEffectiveUrlLength(this.request.compatibility);
    let data = convertStringToUint8(this.request.textdata);
    if (this.request.password)
      data = await encryptDataAsync(this.request.password, data)
    
    const urlEncoded = urlEncode(data)

    if (urlEncoded.length > urlLength){
      return undefined
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