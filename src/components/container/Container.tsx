import React from 'react'
import styles from './Container.module.scss'

type Props = { 
  children: (string | React.ReactNode) | (string | React.ReactNode)[],
  className?: string
}

export default function Container({ children, className }: Props) {
  return <div className={`${styles.container} ${className ?? ''}`}>
    {children}
  </div>
}
