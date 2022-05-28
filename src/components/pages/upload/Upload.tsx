import React, { useState } from 'react'
import styles from './Upload.module.scss'
import { UploadType } from '../../../utils/types'
import { objectEntries } from '../../../utils/vanilla-helpers'
import Compatibility from '../../../components/compatibility/Compatibility'
import Encryption from '../../../components/encryption/Encryption'
import { types, onSubmit, onChange } from './helper'
import Button from '../../button/Button'

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
  const renderMenu = () => objectEntries(types).map(([type, obj]) => {
    return <li 
      onClick={() => setUploadType(+type)} 
      className={+type === uploadType ? styles.active : ''}
    >{obj.label}</li>
  })
  return <div className={styles.upload}>
    <form onSubmit={onSubmit(uploadType)} onChange={onChange} onKeyUp={onChange}>
      <div className={styles.tabContainer}>
        <ul className={styles.tab}>
          {renderMenu()}
        </ul>
        <Compatibility />
      </div>
      {types[uploadType].component}
      <Encryption className={styles.encryption} />
      <Button>Create Link</Button>
    </form>
  </div>
}
