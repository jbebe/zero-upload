import './Download.scss';
import classNames from "classnames";
import { useEffect, useState } from "react";
import { ButtonState } from "../../types/ButtonState";
import { decryptFile } from "../../utils/crypto";

export function Download(props: { hash: string }) {
  const hash = props.hash;
  const [buttonState, setButtonState] = useState(ButtonState.Inactive);
  const [password, setPassword] = useState('');
  const [download, setDownload] = useState(null as HTMLAnchorElement | null);

  useEffect(() => {
    if (password.length > 0){
      setButtonState(ButtonState.Active);
    }
  }, [password]);

  const onSubmit = async () => {
    const [filename, blob] = decryptFile(hash, password);
    download!.href = URL.createObjectURL(blob);
    download!.download = filename;
    download!.click();
    setButtonState(ButtonState.Ready);
  };

  const buttonClassObj = { 
    inactive: buttonState === ButtonState.Inactive, 
    active: buttonState === ButtonState.Active, 
    ready: buttonState === ButtonState.Ready,
  };
  const buttonText = buttonState === ButtonState.Ready ? 'File successfully downloaded' : 'Decrypt & download file';

  return (
    <form>
      <fieldset>
        <label>Password</label>
        <input type="text" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
      </fieldset>
      <fieldset>
        <input className={classNames(buttonClassObj)} type="button" value={buttonText} disabled={buttonState === ButtonState.Inactive} onClick={() => onSubmit()} />
      </fieldset>
      <a ref={setDownload} className="hidden" href="/" download="">&nbsp;</a>
    </form>
  );
}