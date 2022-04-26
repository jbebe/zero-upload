import React, { FormEvent, useState } from 'react'
import styles from './Upload.module.scss'
import { FormFields, UploadRequest, UploadType } from '../../../utils/types'
import Text from '../../../components/upload-types/text/Text'
import { objectEntries } from '../../../utils/vanilla-helpers'
import Image from '../../../components/upload-types/image/Image'
import File from '../../../components/upload-types/file/File'
import Compatibility from '../../../components/compatibility/Compatibility'
import Encryption from '../../../components/encryption/Encryption'
import { LinkCreator } from '../../../logic/link-creator'

// TODO: features to implement
// * add bit field to the beginning: fields are: (zipped, encrypted, upload type (image, file, etc.))

export default function Upload(){
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
      const link = await new LinkCreator(request).getAsync()
      alert(`${location.href}#${link}`)
    })()
    evt.preventDefault()
  }
  const renderMenu = () => objectEntries(types).map(([type, obj]) => 
    <li onClick={() => setUploadType(type)}>{obj.label}</li>)
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
