export enum UploadType { Text, Image, File }

export enum CompatibilityType { 
  Maximum, 
  Modern
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