import React, { FormEvent, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { LinkCreator } from '../../../logic/link-creator'
import { UploadType } from '../../../utils/types'
import { useEffectAsync } from '../../../utils/use-effect-async'
import Button from '../../button/Button'
import styles from './Download.module.scss'

export default function Download(){
  const [password, setPassword] = useState('')
  const [pwState, setPwState] = useState(undefined as (boolean | undefined))
  const [debouncedPassword] = useDebounce(password, 300)

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

  const mediaMap: Record<number, { style: string, label: string }> = {
    [UploadType.Text]: { style: styles.text, label: 'Text message' },
    [UploadType.Image]: { style: styles.image, label: 'Image' },
    [UploadType.File]: { style: styles.file, label: 'File' },
  }

  const onPasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.currentTarget.value)
  }
  const renderContent = () => {
    return (
      <div className={mediaMap[flags.uploadType].style}>
        <div>
          { flags.uploadType === UploadType.Text && data }
          { flags.uploadType === UploadType.Image && (
            <>
              <img src={data} />
              <a href={data} download='image.jpg'>
                <Button>Download</Button>
              </a>
            </>
          ) }
          { flags.uploadType === UploadType.File && (
            <>
              <a href={data} download='unknown.dat'>
                <Button>Download</Button>
              </a>
            </>
          ) }
        </div>
      </div>
    )
  }
  return (
    <div className={styles.download}>
      <div className={styles.media}>
        <i className={`fa-solid ${showPasswordModal ? 'fa-file-shield' : 'fa-envelope-open-text'}`} />
      </div>
      <div className={styles.details}>
        <div>{ showPasswordModal ? 'Secure content' : mediaMap[flags.uploadType].label}</div>
      {showPasswordModal 
        ? <div className={styles.password}>
            <input 
              className={pwState === false ? styles.bad : ''} 
              type="password" 
              name='password' 
              placeholder='Password' 
              onChange={onPasswordChange} />
          </div>
        : renderContent() }
      </div>
    </div>
  )
}
