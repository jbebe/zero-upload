import React, { FormEvent, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { LinkCreator } from '../../../logic/link-creator'
import { useEffectAsync } from '../../../utils/use-effect-async'
import styles from './Download.module.scss'

export default function Download(){
  const [password, setPassword] = useState('')
  const [pwState, setPwState] = useState(undefined as (boolean | undefined))
  const [debouncedPassword] = useDebounce(password, 1000);

  const hash = location.hash.slice(1)
  const [flags, dataPart] = LinkCreator.getParts(hash)
  const showPasswordModal = flags.encrypted && !pwState
  const [data, setData] = useState('')

  useEffectAsync(async () => {
    if (!flags.encrypted){
      setData(await LinkCreator.unpackAsync(dataPart, flags))
      return
    }
    if (password === '') return
    try {
      setData(await LinkCreator.unpackAsync(dataPart, flags, password))
      setPwState(true)
    } catch(ex) {
      setPwState(false)
      console.log(ex)
    }
  }, [debouncedPassword])
  const onPasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.currentTarget.value)
  }
  return (
    <div className={styles.download}>
      <div className={styles.file}>
        <i className={`fa-solid ${showPasswordModal ? 'fa-file-shield' : 'fa-envelope-open-text'}`} />
      </div>
      <div className={styles.details}>
        <div>{ showPasswordModal ? 'Secure content' : 'Text message'}</div>
      {showPasswordModal ?
        <div className={styles.password}>
          <input className={pwState === false ? styles.bad : ''} type="password" name='password' placeholder='Password' onChange={onPasswordChange} />
        </div> :
        <div className={styles.text}>
          <div>{data}</div>
        </div>
        }
      </div>
    </div>
  )
}
