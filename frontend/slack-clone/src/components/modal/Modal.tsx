import React, { useCallback, useState, useRef } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

//components
import { AddRemove } from './AddRemove';

//hooks
import { useUserContext } from 'hooks/useUserContext';

//types
import { ActionType, SelectedOptionType } from 'types';

//constants
import { CHANNEL } from 'Constants';

//CSS
import './Modal.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const Modal = ({
  isOpen,
  headerTitle,
  inputName,
  footerTitle,
  handleClose,
  users,
  selectedId,
  modalType,
  onAction,
}: {
  isOpen: boolean;
  headerTitle: string;
  inputName?: string;
  footerTitle?: string;
  handleClose: () => void;
  users?: Array<{ id: string; displayName: string; included: boolean }>;
  selectedId?: string;
  modalType: SelectedOptionType;
  onAction: React.Dispatch<ActionType>;
}): React.ReactElement => {
  const [inputValue, setInputValue] = useState('');
  const [loggedUser] = useUserContext();
  const { userId: loggedUserId = '' } = loggedUser ?? {};
  const modalContainerRef = useRef(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      async function createChannel() {
        const channelId = uuid();

        axios
          .post(`${BASE_URL}/create/channel/${channelId}`, { userId: loggedUserId, channelName: inputValue })
          .then(res => {
            onAction({
              type: 'select',
              payload: {
                id: channelId,
                selectedOptionType: CHANNEL,
              },
            });
          })
          .catch(err => {
            throw new Error(err);
          });
      }
      setInputValue('');
      handleClose();
      createChannel();
    },
    [inputValue, loggedUserId, handleClose, onAction]
  );

  const handleOutSideClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (modalContainerRef.current === e.target) handleClose();
    },
    [handleClose]
  );
  return (
    <>
      {isOpen ? (
        <div className="modal-container" ref={modalContainerRef} onClick={handleOutSideClick}>
          <div className="modal">
            <div className="modal-header">{headerTitle}</div>
            <span onClick={handleClose}>X</span>
            <form onSubmit={handleSubmit}>
              {inputName ? (
                <>
                  <label htmlFor="modal-input" className="name-label">
                    {inputName}
                  </label>
                  <input id="modal-input" className="name-input" onChange={handleChange} value={inputValue}></input>
                </>
              ) : null}
              {footerTitle ? <button className="modal-footer">{footerTitle}</button> : null}
              <AddRemove
                type={modalType}
                users={users}
                selectedId={selectedId}
                onAction={onAction}
                handleClose={handleClose}
              />
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};
