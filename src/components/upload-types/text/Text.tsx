import React from 'react'
import { FormFields } from '../../../utils/types'
import styles from './Text.module.scss'

export default function Text({ placeholder }: { placeholder?: string }){
  return (
    <div className={styles.text}>
      <textarea name={FormFields.TextData} placeholder={placeholder}></textarea>
    </div>
  )
}
