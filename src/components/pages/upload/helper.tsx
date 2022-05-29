import React, {  } from 'react'
import { FormFields, FormState, UploadRequest, UploadType } from '../../../utils/types'
import Text from '../../../components/upload-types/text/Text'
import Image from '../../../components/upload-types/image/Image'
import File from '../../../components/upload-types/file/File'
import { LinkCreator } from '../../../logic/link-creator'
import { toast } from 'react-toastify'

function createRequest(uploadType: UploadType, formData: FormData): UploadRequest | undefined {
  const request: UploadRequest = {
    uploadType,
    compatibility: +(formData.get(FormFields.Compatibility) === 'on'),
    password: formData.get(FormFields.Password) as string | null,
    textdata: formData.get(FormFields.TextData) as string | null,
    imagedata: formData.get(FormFields.ImageData) as File | null,
    filedata: formData.get(FormFields.FileData) as File | null,
  }
  
  // upload type check
  if (uploadType === UploadType.Text && !request.textdata) return
  if (uploadType === UploadType.Image && !request.imagedata.name) return
  if (uploadType === UploadType.File && !request.filedata.name) return
  
  // security check 
  if (request.password === '') return

  return request
}

export const onSubmit = 
  (uploadType: UploadType) => 
  (evt: React.FormEvent<HTMLFormElement>) => {
  (async () => {
    const formData = new FormData(evt.currentTarget)
    const request = createRequest(uploadType, formData)
    if (!request) return
    const link = await LinkCreator.packAsync(request)
    const url = `${location.href}#${link}`
    await navigator.clipboard.writeText(url)
    toast.info(<>
      <a href={url} target='_blank'>Your link</a> has been copied to clipboard
    </>)
  })()
  evt.preventDefault()
}

export const onChange = 
  (uploadType: UploadType, setFormState: React.Dispatch<React.SetStateAction<FormState>>) => 
  (evt: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLFormElement>) => {
  const formData = new FormData(evt.currentTarget)
  const request = createRequest(uploadType, formData)
  console.log('form changed', request)
  if (!request){
    setFormState(FormState.Disabled)
    return
  }

  /*switch (uploadType){
    case UploadType.Text:

    default: 
      break
  }*/

  if (request.password === ''){
    setFormState(FormState.Disabled)
    return
  }

  setFormState(FormState.Enabled)
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
  },
}
