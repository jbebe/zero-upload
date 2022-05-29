import React, { ReactNode } from "react"
import { FormState } from "../../utils/types"
import styles from './Button.module.scss'

export default function Button({ children, state }: { children: ReactNode, state?: FormState }) {
  return (
    <button className={`${styles.button} ${state ? styles[state] : ''}`}>
      { state === FormState.Loading ? <div className={styles.loader}>Loading...</div> : children }
    </button>
  )
}
