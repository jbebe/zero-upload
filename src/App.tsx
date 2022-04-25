import React from 'react'
import styles from './App.module.scss'
import Download from './components/pages/download/Download'
import Upload from './components/pages/upload/Upload'

export default function App(){
  return <div className={styles.app}>
    {location.hash ? <Download /> : <Upload />}
  </div>
}
