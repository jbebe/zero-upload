import React from 'react'
import styles from './Container.module.scss'

export default function Container({ children }: { children: (string | React.ReactNode) | (string | React.ReactNode)[] }){
  return <div className={styles.container}>
    {children}
  </div>
}
