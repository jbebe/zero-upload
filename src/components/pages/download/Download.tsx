import React from 'react'
import { LinkCreator } from '../../../logic/link-creator'
import styles from './Download.module.scss'

export default function Download(){
  const hash = location.hash.slice(1)
  const data = LinkCreator.decode(hash)
  return <div className={styles.download}>
    <p>Decoded message:</p>
    <pre>{data}</pre>
  </div>
}
