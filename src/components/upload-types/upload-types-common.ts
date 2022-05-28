export function renderFileName(fileName: string){
  const limit = 35
  if (fileName.length < limit) return fileName
  const etc = '[..]'
  const keptLength = ((limit - etc.length) / 2) | 0
  return fileName.replace(new RegExp(`^(.{${keptLength}}).*(.{${keptLength}})$`, 'g'), `$1${etc}$2`)
}

export function addFileToFormData(file: File) {
  // Set input.files to the file
  // HACK: https://github.com/react-dropzone/react-dropzone/issues/131
  // Dropzone does not set the input element to the new file therefore
  // we can't use it during form submission. This code sets the files property manually
  const dt = new DataTransfer()
  dt.items.add(file)
  if (document.querySelector('input[type=file]'))
    (document.querySelector('input[type=file]') as HTMLInputElement).files = dt.files
}

export function sendFileChangedEvent(componentRef: React.MutableRefObject<HTMLDivElement>) {
  // Send event to form
  const dropEvent = new CustomEvent<HTMLFormElement>('change', { bubbles: true })
  componentRef.current.dispatchEvent(dropEvent)
}
