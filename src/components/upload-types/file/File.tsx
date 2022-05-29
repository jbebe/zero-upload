import React, { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FormFields } from '../../../utils/types'
import { addFileToFormData, renderFileName, sendChangeEvent } from '../upload-types-common'
import styles from '../image/Image.module.scss'

export default function File(){
  const componentRef = useRef<HTMLDivElement>()
  const [fileName, setFileName] = useState<string | undefined>(undefined)
  const onDrop = useCallback(async <T extends File>([file]: T[]) => {
    setFileName(file.name)
    addFileToFormData(file)
    sendChangeEvent(componentRef)
  }, [])
  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    multiple: false,
  })
  return (
    <div ref={componentRef} className={`${styles.file} ${fileName ? styles.active : ''}`}>
      <div {...getRootProps({
        className: styles.wrapper,
      })}>
        <input {...getInputProps({
          name: FormFields.FileData,
        })} />
        { fileName
          ? <><i className="fa-solid fa-file-circle-check"></i>{renderFileName(fileName)}</>
          : <span>Drag 'n' drop or click to select file</span> }
      </div>
    </div>
  )
}
