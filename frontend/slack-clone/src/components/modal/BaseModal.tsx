import React from 'react';

export const BaseModal = ({
  inputName,
  footerTitle,
  onChange,
  inputValue,
}: {
  inputName?: string;
  footerTitle?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue?: string;
}): React.ReactElement => {
  return (
    <>
      {inputName ? (
        <>
          <label htmlFor="modal-input" className="name-label">
            {inputName}
          </label>
          <input id="modal-input" className="name-input" onChange={onChange} value={inputValue}></input>
        </>
      ) : null}
      {footerTitle ? <button className="modal-footer">{footerTitle}</button> : null}
    </>
  );
};
