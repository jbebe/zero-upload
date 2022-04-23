import React from 'react'
import { FormFields } from '../../../utils/types'
import styles from './Image.module.scss'

export default function Image(){
  return (
    <div className={styles.image}>
      <input type="file" name={FormFields.FileData} multiple={true} accept='image/jpeg,image/png,image/gif' />
    </div>
  )
}
