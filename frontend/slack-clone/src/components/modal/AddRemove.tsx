import React, { useCallback } from 'react';
import axios from 'axios';

//components
import { User } from './User';

//types
import { ActionType, SelectedOptionType } from 'types';

//hooks
import { useUserContext } from 'hooks/useUserContext';

//constants
import { CHANNEL, REMOVE, USER } from 'Constants';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const AddRemove = ({
  users,
  type,
  selectedId,
  onAction,
  handleClose,
}: {
  users?: Array<{ id: string; displayName: string; included: boolean }>;
  type: SelectedOptionType;
  selectedId?: string;
  onAction: React.Dispatch<ActionType>;
  handleClose: () => void;
}): React.ReactElement => {
  const [loggedUser] = useUserContext();
  const { userId: loggedUserId } = loggedUser ?? {};
  const includedUsers = users?.filter(user => user.included);
  const excludedUsers = users?.filter(user => !user.included);

  const handleAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent> & React.ChangeEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const clickedUserId = e.target.id;
      const clickedUser = users?.filter(ele => ele.id === clickedUserId)?.[0];

      if (clickedUser?.included && type === CHANNEL) {
        axios
          .post(`${BASE_URL}/remove/user/fromChannel`, { channelId: selectedId, userId: clickedUserId })
          .then(res => {
            if (clickedUserId === loggedUserId) {
              onAction({
                type: REMOVE,
                payload: {
                  id: '',
                },
              });
            }
          });
      } else if (type === CHANNEL) {
        axios.post(`${BASE_URL}/add/user/toChannel`, { channelId: selectedId, userId: clickedUserId });
      }

      if (type === USER) {
        if (clickedUser?.included) {
          axios.post(`${BASE_URL}/remove/directUser/${loggedUserId}`, { directUserId: clickedUserId });

          if (clickedUserId === selectedId) {
            onAction({
              type: REMOVE,
              payload: {
                id: '',
              },
            });
          }
        } else {
          axios.post(`${BASE_URL}/add/directUser/${loggedUserId}`, { directUserId: clickedUserId });
          onAction({
            type: 'select',
            payload: {
              id: clickedUserId,
              selectedOptionType: USER,
            },
          });
          handleClose();
        }
      }
    },
    [users, selectedId, type, loggedUserId, onAction, handleClose]
  );
  return (
    <div>
      {includedUsers?.map(user => (
        <User key={user.id} user={user} handleAction={handleAction} />
      ))}
      {excludedUsers?.map(user => (
        <User key={user.id} user={user} handleAction={handleAction} />
      ))}
    </div>
  );
};
