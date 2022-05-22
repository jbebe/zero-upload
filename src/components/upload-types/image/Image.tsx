import React, { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FormFields } from '../../../utils/types'
import styles from './Image.module.scss'

export default function Image(){
  const componentRef = useRef<HTMLDivElement>()
  const inputRef = useRef<HTMLInputElement>()
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)
  const onDrop = useCallback(async <T extends File>([file]: T[]) => {
    // Set the background to the image
    URL.revokeObjectURL(imageUrl)
    setImageUrl(URL.createObjectURL(file))

    // Set input.files to the file
    // HACK: https://github.com/react-dropzone/react-dropzone/issues/131
    // Dropzone does not set the input element to the new file therefore
    // we can't use it during form submission. This code sets the files property manually
    const dt = new DataTransfer()
    dt.items.add(file)
    if (document.querySelector('input[type=file]'))
      (document.querySelector('input[type=file]') as HTMLInputElement).files = dt.files
    
    // Send event to form
    const dropEvent = new CustomEvent<HTMLFormElement>('change', { bubbles: true })
    componentRef.current.dispatchEvent(dropEvent)
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
    <div ref={componentRef} className={`${styles.image} ${imageUrl ? styles.active : ''}`} style={{ backgroundImage: `url('${imageUrl}')` }}>
      <div {...getRootProps({
        className: styles.wrapper,
      })}>
        <input ref={inputRef} {...getInputProps({
          name: FormFields.ImageData,
        })} />
        { imageUrl
          ? <i className="fa-solid fa-file-circle-check"></i>
          : <span>Drag 'n' drop or click to select image</span> }
      </div>
    </div>
  )
}
