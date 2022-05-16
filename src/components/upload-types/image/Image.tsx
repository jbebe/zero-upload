import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FormFields } from '../../../utils/types'
import { loadFileAsync } from '../../../utils/vanilla-helpers'
import styles from './Image.module.scss'

export default function Image(){
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)
  const onDrop = useCallback(async <T extends File>([file]: T[]) => {
    //const buffer = await loadFileAsync(file)
    setImageUrl(URL.createObjectURL(file))
  }, [])
  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    multiple: false,
    accept: { 
      'image/jpeg': ['.jpg', '.jpeg'], 
      'image/png': ['.png'], 
      'image/gif': ['.gif'] 
    }
  })
  return (
    <div className={`${styles.image} ${imageUrl ? styles.active : ''}`} style={{ backgroundImage: `url('${imageUrl}')` }}>
      <div {...getRootProps({
        className: styles.wrapper,
      })}>
        <input {...getInputProps({
          name: FormFields.FileData,
        })} />
        { imageUrl
          ? <i className="fa-solid fa-file-circle-check"></i>
          : <span>Drag 'n' drop or click to select image</span> }
      </div>
    </div>
  )
}
