import React, { useEffect, useRef, useState } from 'react'
import { FormFields } from '../../utils/types'
import { sendChangeEvent } from '../upload-types/upload-types-common'
import styles from './Encryption.module.scss'

export default function Encryption({ className }: { className?: string }){
  const elemRef = useRef<HTMLInputElement>()
  const [showPassword, setShowPassword] = useState(false)
  const toggleEncryption = () => setShowPassword(!showPassword)
  useEffect(() => sendChangeEvent(elemRef), [showPassword])
  return (
    <div className={`${styles.encryption} ${className ?? ''} ${showPassword ? styles.active : ''}`} ref={elemRef}>
      <div className={styles.toggle} onClick={toggleEncryption}>
        <div>Security</div>
        <div><i className={`fa-solid ${showPassword ? 'fa-lock' :'fa-lock-open'}`}></i></div>
      </div>
      <div className={styles.input}>
        { showPassword && <input type='password' name={FormFields.Password} placeholder='Pick a password' /> }
      </div>
    </div>
  )
}
