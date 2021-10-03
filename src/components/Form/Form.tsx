import {useEffect, useState} from 'react';
import './Form.scss';
import {useDropzone, FileError, ErrorCode} from 'react-dropzone';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';
import { encryptFileAsync } from '../../utils/crypto';
import filesize from 'filesize';
import { DefaultBrowserUrlLength } from '../../utils/system';
import { ButtonState } from '../../types/ButtonState';

export function Form() {
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorBrowser, setErrorBrowser] = useState(false);
  const [formInputReady, setFormInputReady] = useState(false);
  const [uploadReady, setUploadReady] = useState(false);
  const [buttonState, setButtonState] = useState(ButtonState.Inactive);
  const [browserType, setBrowserType] = useState(DefaultBrowserUrlLength);
  let [encryptedFile, setEncryptedFile] = useState('');
  const defaultUrlLength = browserType.IE.length;
  let [urlLength, setUrlLength] = useState(defaultUrlLength);
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({ 
    multiple: false, 
    maxSize: urlLength,
    validator: file => {
      if (file.size > urlLength){
        return { message: '', code: ErrorCode.FileTooLarge } as FileError;
      }
      return null;
    },
  });
  const [defaultUrlState, setDefaultUrlState] = useState(true);
  
  const onChangeBrowser = (elem: HTMLInputElement) => {
    setDefaultUrlState(false);
    urlLength = Infinity;
    const browsers = Object.values(browserType);
    const browser = browsers.find(x => x.text === elem.parentElement!.textContent!.trim())!;
    browser.active = elem.checked;
    
    const newUrlLength = browsers.reduce((acc, curr) => {
      if (curr.active && curr.length < acc)
        return curr.length;
      return acc;
    }, urlLength);
    setUrlLength(newUrlLength);
    setBrowserType({ ...browserType });
  }

  useEffect(() => {
    let isValid = true;
    
    if (!/^[\da-zA-Z]{5,}$/.test(password)){
      setErrorPassword(true);
      isValid = false;
    }
    else {
      setErrorPassword(false);
    }
    
    if (!Object.values(browserType).some(x => x.active)){
      setErrorBrowser(true);
      isValid = false;
    }
    else {
      setErrorBrowser(false);
    }
    
    if (isValid) {
      setFormInputReady(true);
    }
  }, [password, browserType]);

  useEffect(() => {
    let isValid = true;

    if (fileRejections.length > 0){
      alert('File is too big for the selected browser(s)');
      isValid = false;
    }

    if (acceptedFiles.length === 0){
      isValid = false;
    }

    if (isValid) {
      setUploadReady(true);
    }
  }, [acceptedFiles, fileRejections]);

  useEffect(() => {
    if (formInputReady && uploadReady){
      setButtonState(ButtonState.Active);
    }
  }, [formInputReady, uploadReady]);

  const onSubmit = async () => {
    switch (buttonState){
      case ButtonState.Active:
        // TODO: support multiple files
        encryptedFile = await encryptFileAsync(acceptedFiles[0], password);
        setEncryptedFile(encryptedFile);
        setButtonState(ButtonState.Ready);
        break;
      case ButtonState.Ready:
        window.navigator.clipboard.writeText(`${window.location.href}#${encryptedFile}`);
        setButtonState(ButtonState.After);
        setTimeout(() => setButtonState(ButtonState.Ready), 2 * 1000);
        break;
    }
  };

  const buttonClassObj = { 
    inactive: buttonState === ButtonState.Inactive, 
    active: buttonState === ButtonState.Active, 
    ready: buttonState === ButtonState.Ready,
    after: buttonState === ButtonState.After,
  };
  const buttonText = (() => {
    switch (buttonState){
      case ButtonState.Inactive:
      case ButtonState.Active:
        return 'Generate link';
      case ButtonState.Ready:
        return 'Copy link to clipboard';
      case ButtonState.After:
        return 'Link copied';
    }
  })();

  return (
    <form>
      <fieldset>
        <label data-tip={ 'Sets the supported file length.<br>Every browser supports different URL length so '
                          + 'we are aiming for the lowest to be used for storing the file data.'}>Browser support</label>
      </fieldset>
      <fieldset className={classNames({ error: errorBrowser })}>
        <div className="browsers">
          <label>{browserType.Chrome.text} <input type="checkbox" onChange={e => onChangeBrowser(e.target)} /></label>
          <label>{browserType.Firefox.text} <input type="checkbox" onChange={e => onChangeBrowser(e.target)} /></label>
          <span />
          <label>{browserType.IE.text} <input type="checkbox" onChange={e => onChangeBrowser(e.target)} checked={defaultUrlState || browserType.IE.active} /></label>
          <label>{browserType.Safari.text} <input type="checkbox" onChange={e => onChangeBrowser(e.target)} /></label>
          <label className="custom"><input type="text" value={urlLength} readOnly={true} /> characters</label>
        </div>
      </fieldset>
      <fieldset>
        <div className="upload" {...getRootProps()}>
          <input {...getInputProps()} />
          { acceptedFiles.length === 0
            ? <p>Drag 'n' drop some files here, or click to select files</p>
            : <ul>{acceptedFiles.map(x => <li key={x.name}>{x.name} ({filesize(x.size)})</li>)}</ul>
          }
        </div>
      </fieldset>
      <fieldset className={classNames({ error: errorPassword })}>
        <label data-tip="Set a password for the encryptable file. It must be longer than 4 characters and can only contain alphanumeric characters">Password</label>
        <input type="text" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
      </fieldset>
      <fieldset>
        <input className={classNames(buttonClassObj)} type="button" value={buttonText} disabled={buttonState === ButtonState.Inactive} onClick={() => onSubmit()} />
      </fieldset>
      <ReactTooltip effect='solid' type="dark" multiline={true} />
    </form>
  );
}
