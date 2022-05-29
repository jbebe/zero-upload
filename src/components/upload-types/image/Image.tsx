import React, { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FormFields } from '../../../utils/types'
import { addFileToFormData, renderFileName, sendChangeEvent } from '../upload-types-common'
import styles from './Image.module.scss'

export default function Image(){
  const componentRef = useRef<HTMLDivElement>()
  const inputRef = useRef<HTMLInputElement>()
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)
  const [fileName, setFileName] = useState<string | undefined>(undefined)
  const onDrop = useCallback(async <T extends File>([file]: T[]) => {
    // Set the background to the image
    URL.revokeObjectURL(imageUrl)
    setFileName(file.name)
    setImageUrl(URL.createObjectURL(file))
    addFileToFormData(file)
    sendChangeEvent(componentRef)
  }, [])
  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    multiple: false,
    accept: { 
      'image/jpeg': ['.jpg', '.jpeg', '.png', '.gif'],
    }
  })
  return (
    <div ref={componentRef} className={`${styles.image} ${imageUrl ? styles.active : ''}`} style={{ backgroundImage: `url('${imageUrl}')` }}>
      <div {...getRootProps({
        className: styles.wrapper,
      })}>
        <input ref={inputRef} {...getInputProps({
          name: FormFields.ImageData,
        })} />
        { imageUrl
          ? <><i className="fa-solid fa-file-circle-check"></i>{renderFileName(fileName)}</>
          : <span>Drag 'n' drop or click to select image</span> }
      </div>
    </div>
  )
}
