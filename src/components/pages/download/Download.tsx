import React, { FormEvent, useState } from 'react'
import { LinkCreator } from '../../../logic/link-creator'
import { useEffectAsync } from '../../../utils/use-effect-async'
import styles from './Download.module.scss'

export default function Download(){
  const [password, setPassword] = useState('')
  const hash = location.hash.slice(1)
  const [flags, dataPart] = LinkCreator.getParts(hash)
  const showPasswordModal = flags.encrypted && password === ''
  const [data, setData] = useState('')

  useEffectAsync(async () => {
    if (!flags.encrypted){
      setData(await LinkCreator.unpackAsync(dataPart, flags, password))
      return
    }
    if (password === '') return
    try {
      setData(await LinkCreator.unpackAsync(dataPart, flags, password))
    } catch(ex) {
      console.log(ex)
    }
  }, [password])
  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(evt.currentTarget)
    setPassword(formData.get('password') as string)
    evt.preventDefault()
  }
  return <div className={styles.download}>
    {showPasswordModal ?
      <p>
        Enter password for link: 
        <form onSubmit={onSubmit}>
          <input type="password" name='password' />
          <button>Submit</button>
        </form>
      </p> :
      <>
        <p>Decoded message:</p>
        <pre>{data}</pre>
      </>
      }
  </div>
}
