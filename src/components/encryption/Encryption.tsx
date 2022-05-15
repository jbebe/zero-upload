import React, { useEffect, useState } from 'react'
import { FormFields } from '../../utils/types'
import styles from './Encryption.module.scss'

export default function Encryption({ className }: { className?: string }){
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (!showPassword){
      
    }
  }, [showPassword])

  return (
    <div className={`${styles.encryption} ${className ?? ''} ${showPassword ? styles.active : ''}`}>
      <div className={styles.toggle} onClick={() => setShowPassword(!showPassword)}>
        <div>Security</div>
        <div><i className={`fa-solid ${showPassword ? 'fa-lock' :'fa-lock-open'}`}></i></div>
      </div>
      <div className={styles.input}>
        <input type='password' name={FormFields.Password} placeholder='Pick a password' />
      </div>
    </div>
  )
}
