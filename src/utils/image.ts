import { formatSize } from "./size"
import { ImageMimeType, ImageType } from "./types"
import { loadFileAsync } from "./vanilla-helpers"

// BUG: Chrome does not support avif encoding with custom quality, 
// fallback to webp until it gets fixed
let _avifSupported: boolean | undefined = false
async function isAvifSupportedAsync(): Promise<boolean> {
  if (_avifSupported === undefined){
    await new Promise((resolve, _) => {
      const avif = new Image()
      avif.src = 'data:image/avif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAAC' +
        'Qd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqG' + 
        'QAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII='
      avif.onload = avif.onerror = function () {
          _avifSupported = avif.height === 1
          resolve(_avifSupported);
      }
    })
  }
  return _avifSupported
}

export function loadImageAsync(image: File){
  return loadFileAsync(image)
}

export function getDataUrlAsync(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader()
    reader.onload = e => res(e.target.result as string)
    reader.onerror = e => rej(e)
    reader.readAsDataURL(file)
  })
}

// quality: 0...1
// image/jpeg image/webp image/png
export async function encodeImageAsync(imageFile: File, type: ImageMimeType, quality: number, zoom: number): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const cancellationToken = setTimeout(() => reject(), 3000)
    const imgObj = new Image()
    const url = URL.createObjectURL(imageFile)
    imgObj.onload = () => {
      try {
        URL.revokeObjectURL(url)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = imgObj.width * zoom
        canvas.height = imgObj.height * zoom
        if (canvas.width < 1 || canvas.height < 1){
          throw new Error('Image zoom goes beyond 1x1 pixel, exiting')
        }
        ctx.drawImage(imgObj, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(async blob => {
          const bytes = new Uint8Array(await blob.arrayBuffer())
          clearTimeout(cancellationToken)
          resolve(bytes)
        }, type, quality)
      } catch (ex){
        reject(ex)
      }
    }
    imgObj.src = url
  })
}

export async function decodeImageAsync(data: Uint8Array): Promise<string> {
  const mimeType = await isAvifSupportedAsync() ? ImageMimeType.Avif : ImageMimeType.Webp
  const blob = new Blob([data], { type: mimeType })
  const url = URL.createObjectURL(blob)
  return url
}

export async function fuzzyEncodeImageAsync(imageFile: File, maxLength: number): Promise<Uint8Array> {
  const compressionAlgorithm = await isAvifSupportedAsync() ? ImageMimeType.Avif : ImageMimeType.Webp
  let image: Uint8Array

  // fit into url by decreasing quality
  for (let i = 80; i >= 0; i -= 10){
    image = await encodeImageAsync(imageFile, compressionAlgorithm, i/100.0, 1)
    console.log(`decrease quality: ${formatSize(image.byteLength)}`)
    if (image.byteLength <= maxLength)
      return image
  }

  // fit into url by decreasing image size
  let lastTooBig = 1
  let lastSmall = 0
  for (let i = 1; i > 0; i *= 0.75){
    image = await encodeImageAsync(imageFile, compressionAlgorithm, 0, i)
    console.log(`decrease size: ${formatSize(image.byteLength)}`)
    if (image.byteLength <= maxLength){
      lastSmall = i
      break
    }
    lastTooBig = i
  }

  // we know the boundaries of the perfect fitting image
  // now loop between too big and too small
  const step = (lastTooBig - lastSmall) / 20
  for (let i = lastTooBig; i >= lastSmall; i -= step){
    image = await encodeImageAsync(imageFile, compressionAlgorithm, 0, i)
    console.log(`refine size by ${(i*100)|0}%: ${formatSize(image.byteLength)}`)
    if (image.byteLength <= maxLength){
      return image
    }
  }
}