export enum PageType { Upload, Download }

export enum UploadType { Text, Image, File }

export enum FormState { 
  Disabled = 'disabled', 
  Loading = 'loading', 
  Enabled = 'enabled',
}

export enum CompatibilityType { 
  None = 0,
  Maximum = 1, 
}

export enum FormFields {
  Compatibility = 'compatibility',
  TextData = 'textdata',
  ImageData = 'imagedata',
  FileData = 'filedata',
  Password = 'password',
}

export type UploadRequest = {
  uploadType: UploadType,
  [FormFields.Compatibility]: CompatibilityType,
  [FormFields.Password]: string | null,
  
  [FormFields.TextData]: string | null,
  [FormFields.ImageData]: File | null,
  [FormFields.FileData]: File | null,
}

export enum ErrorType {
  UrlLength,
}

export type PackError = {
  type: ErrorType,
}

export type ImagePackInfo = {
  length: number,
  maxLength: number,
}

export type UrlPackError = PackError & ImagePackInfo

export type PackResult = {
  url?: string,
  info?: ImagePackInfo,
  error?: UrlPackError,
}

export enum ImageType {
  Webp = 0,
  Png = 1,
}

export enum ImageMimeType {
  Webp = 'image/webp',
  Avif = 'image/avif',
  Jpeg = 'image/jpeg', // jpeg has awful quality, only use for converting from webp
}