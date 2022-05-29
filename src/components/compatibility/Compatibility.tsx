import React, { useEffect, useRef, useState } from 'react'
import { FormFields } from '../../utils/types'
import { sendChangeEvent } from '../upload-types/upload-types-common'
import styles from './Compatibility.module.scss'

export default function Compatibility() {
  const [checked, setChecked] = useState(true)
  const componentRef = useRef<HTMLDivElement>()
  const onClick = (ev: React.MouseEvent<HTMLLabelElement>) => {
    ev.preventDefault()
    setChecked(!checked)
    return false
  }
  useEffect(() => {
    sendChangeEvent(componentRef)
  }, [checked])
  return (
    <div className={styles.compatibility} ref={componentRef}>
      <label className={styles.toggleControl} onClick={onClick}>
        compatibility
        <input type="checkbox" name={FormFields.Compatibility} checked={checked} />
        <span className={styles.control}></span>
      </label>
    </div>
  )
}
