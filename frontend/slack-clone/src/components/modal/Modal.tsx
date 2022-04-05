import React, { useCallback, useState, useRef } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

//components
import { AddRemove } from './AddRemove';
import { BaseModal } from './BaseModal';

//hooks
import { useLoggedUserContext } from 'hooks/useUserContext';

//types
import { ActionType, SelectedType } from 'types';

//constants
import { CHANNEL, DIRECT_MESSAGE, SELECT } from 'Constants';

//CSS
import './Modal.css';

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
  modalType: SelectedType;
  onAction: React.Dispatch<ActionType>;
}): React.ReactElement => {
  const [inputValue, setInputValue] = useState('');
  const [loggedUser] = useLoggedUserContext();
  const [error, setError] = useState<string | null>(null);
  const { userId: loggedUserId } = loggedUser;
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
          .post(`/create/channel/${channelId}`, { userId: loggedUserId, channelName: inputValue })
          .then(res => {
            onAction({
              type: SELECT,
              payload: {
                selectedId: channelId,
                selectedType: CHANNEL,
              },
            });
            handleClose();
            setInputValue('');
          })
          .catch(err => {
            throw new Error(err);
          });
      }
      async function createDirectMessage() {
        axios.post('/create/directMessage', { loggedUserId, directUsersId: [inputValue] }).then(res => {
          const { status, data } = res.data;

          if (status === 'success') {
            onAction({
              type: SELECT,
              payload: {
                selectedId: data.directMessageId,
                selectedType: DIRECT_MESSAGE,
              },
            });
            handleClose();
            setInputValue('');
          } else {
            setError(`${inputValue} does not exists`);
          }
        });
      }

      if (modalType === CHANNEL) createChannel();
      if (modalType === DIRECT_MESSAGE) createDirectMessage();
    },
    [inputValue, loggedUserId, handleClose, onAction, modalType]
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
              <BaseModal
                inputName={inputName}
                onChange={handleChange}
                footerTitle={footerTitle}
                inputValue={inputValue}
              />
              <AddRemove
                type={modalType}
                users={users}
                selectedId={selectedId}
                onAction={onAction}
                handleClose={handleClose}
              />
              {error && <div className="error">{error}</div>}
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};
