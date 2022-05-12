import React, { FormEvent, useState } from 'react'
import styles from './Upload.module.scss'
import { CompatibilityType, FormFields, UploadRequest, UploadType } from '../../../utils/types'
import Text from '../../../components/upload-types/text/Text'
import { objectEntries } from '../../../utils/vanilla-helpers'
import Image from '../../../components/upload-types/image/Image'
import File from '../../../components/upload-types/file/File'
import Compatibility from '../../../components/compatibility/Compatibility'
import Encryption from '../../../components/encryption/Encryption'
import { LinkCreator } from '../../../logic/link-creator'

export default function Upload(){
  (async () => {
    /*try {
      const text = 'Hello World!'.repeat(10)
      const password = text
      const request: UploadRequest = {
        uploadType: UploadType.Text,
        compatibility: CompatibilityType.Maximum,
        password: password,
        textdata: text,
        imagedata: null,
        filedata: null,
      }
      const link = await LinkCreator.packAsync(request)
  
      const [flags, data] = LinkCreator.getParts(link)
      const returnedText = await LinkCreator.unpackAsync(data, flags, password)
  
      if (text === returnedText){
        console.log('ASSERT OK')
        console.log(`text length: ${text.length}, data length: ${data.byteLength} --> ${Math.round((100*data.byteLength)/text.length)}%`)
      } else {
        console.log('ASSERT BAD')
      }
    } catch(ex) {
      console.log(ex)
    }*/
  })()

  const [uploadType, setUploadType] = useState<UploadType>(UploadType.Text)
  const types = {
    [UploadType.Text]: { label: 'Text', component: <Text /> },
    [UploadType.Image]: { label: 'Image', component: <Image /> },
    [UploadType.File]: { label: 'File', component: <File /> },
  }
  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    (async () => {
      const formData = new FormData(evt.currentTarget)
      const request: UploadRequest = {
        uploadType,
        compatibility: parseInt(formData.get(FormFields.Compatibility) as string),
        password: formData.get(FormFields.Password) as string | null,
        textdata: formData.get(FormFields.TextData) as string | null,
        imagedata: formData.get(FormFields.ImageData) as File | null,
        filedata: formData.get(FormFields.FileData) as File | null,
      }
      const link = await LinkCreator.packAsync(request)
      alert(`${location.href}#${link}`)
    })()
    evt.preventDefault()
  }
  const renderMenu = () => objectEntries(types).map(([type, obj]) => 
    <li onClick={() => setUploadType(+type)}>{obj.label}</li>)
  return <div className={styles.upload}>
    <ul>
      {renderMenu()}
    </ul>
    <form onSubmit={onSubmit}>
      <Compatibility />
      {types[uploadType].component}
      <Encryption />
      <button>Generate link</button>
    </form>
  </div>
}
