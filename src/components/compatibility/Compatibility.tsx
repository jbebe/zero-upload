import React from 'react'
import { CompatibilityType, FormFields } from '../../utils/types'
import styles from './Compatibility.module.scss'

export default function Compatibility() {
  return <div className={styles.compatibility}>
    <div>Browser support: </div>
    <label>
      <input type="radio" name={FormFields.Compatibility} value={CompatibilityType.Maximum} checked />
      <span>Maximum</span>
    </label>
    <label>
      <input type="radio" name={FormFields.Compatibility} value={CompatibilityType.Modern} />
      <span>Modern only</span>
    </label>
  </div>
}
