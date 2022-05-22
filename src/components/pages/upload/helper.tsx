import React, {  } from 'react'
import { FormFields, UploadRequest, UploadType } from '../../../utils/types'
import Text from '../../../components/upload-types/text/Text'
import Image from '../../../components/upload-types/image/Image'
import File from '../../../components/upload-types/file/File'
import { LinkCreator } from '../../../logic/link-creator'
import { toast } from 'react-toastify'

export const onSubmit = (uploadType: UploadType) => (evt: React.FormEvent<HTMLFormElement>) => {
  (async () => {
    const formData = new FormData(evt.currentTarget)
    const request: UploadRequest = {
      uploadType,
      compatibility: +(formData.get(FormFields.Compatibility) === 'on'),
      password: formData.get(FormFields.Password) as string | null,
      textdata: formData.get(FormFields.TextData) as string | null,
      imagedata: formData.get(FormFields.ImageData) as File | null,
      filedata: formData.get(FormFields.FileData) as File | null,
    }
    const link = await LinkCreator.packAsync(request)
    const url = `${location.href}#${link}`
    await navigator.clipboard.writeText(url)
    toast.info(<>
      <a href={url} target='_blank'>Your link</a> has been copied to clipboard
    </>)
  })()
  evt.preventDefault()
}

export const onChange = (evt: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLFormElement>) => {
  /*const result = [] as [string, string][]
  new FormData(evt.currentTarget).forEach((val, key) => {
    result.push([key, val.toString()])
  })
  console.log('form changed', result)*/
}

export const types = {
  [UploadType.Text]: { 
    label: 'Text', 
    component: <Text placeholder='Your message...' />,
  },
  [UploadType.Image]: { 
    label: 'Image', 
    component: <Image />,
  },
  [UploadType.File]: { 
    label: 'File', 
    component: <File />,
    comingSoon: true,
  },
}
