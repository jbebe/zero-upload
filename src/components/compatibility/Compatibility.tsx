import React from 'react'
import { CompatibilityType, FormFields } from '../../utils/types'
import styles from './Compatibility.module.scss'

export default function Compatibility(){
  return <div className={styles.compatibility}>
    <select name={FormFields.Compatibility}>
      <option value={CompatibilityType.Maximum}>All browsers</option>
      <option value={CompatibilityType.Modern} selected={true}>Modern browsers</option>
    </select>
  </div>
}
