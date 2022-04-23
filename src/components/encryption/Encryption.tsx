import React, { useState } from 'react'
import { FormFields } from '../../utils/types'
import styles from './Encryption.module.scss'

export default function Encryption(){
  const [isChecked, setIsChecked] = useState(false);

  return <div className={styles.encryption}>
    <p>Encrypt data: <input type='checkbox' onChange={() => setIsChecked(!isChecked)} /></p>
    {isChecked && <p>Password: <input type='password' name={FormFields.Password} /></p>}
  </div>
}
