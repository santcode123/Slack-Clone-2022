import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

//CSS
import './Modal.css';
import { useUserContext } from 'hooks/useUserContext';

export const Modal = ({
  isOpen,
  headerTitle,
  inputName,
  footerTitle,
  handleClose,
}: {
  isOpen: boolean;
  headerTitle: string;
  inputName: string;
  footerTitle: string;
  handleClose: (isOpen: boolean) => void;
}): React.ReactElement => {
  const [inputValue, setInputValue] = useState('');
  const [userId] = useUserContext();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    async function createChannel() {
      const channelId = uuid();
      axios.post(`/create/channel/${channelId}`, { channelName: inputValue, userId: userId });
    }
    createChannel();
  }

  function handleClick() {
    handleClose(!isOpen);
  }
  return (
    <>
      {isOpen ? (
        <div className="modal-container">
          <div className="modal">
            <span onClick={handleClick}>X</span>
            <form onSubmit={handleSubmit}>
              <div className="modal-header">{headerTitle}</div>
              <label htmlFor="modal-input" className="name-label">
                {inputName}
              </label>
              <input id="modal-input" className="name-input" onChange={handleChange} value={inputValue}></input>
              <button className="modal-footer">{footerTitle}</button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};
