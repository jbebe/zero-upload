import React, { useEffect, useRef, useState } from 'react'
import styles from './Upload.module.scss'
import { FormState, UploadType } from '../../../utils/types'
import { objectEntries } from '../../../utils/vanilla-helpers'
import Compatibility from '../../../components/compatibility/Compatibility'
import Encryption from '../../../components/encryption/Encryption'
import { types, onSubmit, onChange } from './helper'
import Button from '../../button/Button'
import { sendChangeEvent } from '../../upload-types/upload-types-common'

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

  const [uploadType, setUploadType] = useState(UploadType.Text)
  const [formState, setFormState] = useState(FormState.Disabled)
  const [packedUrl, setPackedUrl] = useState('')
  const tabRef = useRef<HTMLDivElement>()
  useEffect(() => sendChangeEvent(tabRef), [uploadType])
  const renderMenu = () => objectEntries(types).map(([type, obj]) => {
    return <li 
      key={type}
      onClick={() => setUploadType(+type)} 
      className={+type === uploadType ? styles.active : ''}
    >{obj.label}</li>
  })
  return <div className={styles.upload}>
    <form 
      onSubmit={onSubmit(formState, packedUrl)} 
      onChange={onChange(uploadType, setFormState, setPackedUrl)} 
      onKeyUp={onChange(uploadType, setFormState, setPackedUrl)}
    >
      <div className={styles.tabContainer} ref={tabRef}>
        <ul className={styles.tab}>
          {renderMenu()}
        </ul>
        <Compatibility />
      </div>
      {types[uploadType].component}
      <Encryption className={styles.encryption} />
      <Button state={formState}>Create Link</Button>
    </form>
  </div>
}
