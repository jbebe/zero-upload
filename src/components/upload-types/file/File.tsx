import React from 'react'
import { FormFields } from '../../../utils/types'
import styles from './File.module.scss'

export default function File() {
  return (
    <div className={styles.file}>
      <input type="file" name={FormFields.FileData} multiple={true} />
    </div>
  )
}
