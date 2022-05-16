import React from 'react'
import { FormFields } from '../../utils/types'
import styles from './Compatibility.module.scss'

export default function Compatibility() {
  return (
    <div className={styles.compatibility}>
      <label className={styles.toggleControl}>
        compatibility
        <input type="checkbox" name={FormFields.Compatibility} checked />
        <span className={styles.control}></span>
      </label>
    </div>
  )
}
