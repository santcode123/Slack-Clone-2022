import React, { useCallback } from 'react';
import axios from 'axios';

//components
import { User } from './User';

//types
import { ActionType, SelectedType } from 'types';

//hooks
import { useLoggedUserContext } from 'hooks/useUserContext';
import { CHANNEL, REMOVE, USER } from 'Constants';

export const AddRemove = ({
  users,
  type,
  selectedId,
  onAction,
  handleClose,
}: {
  users?: Array<{ id: string; displayName: string; included: boolean }>;
  type: SelectedType;
  selectedId?: string;
  onAction: React.Dispatch<ActionType>;
  handleClose: () => void;
}): React.ReactElement => {
  const [loggedUser] = useLoggedUserContext();
  const { userId: loggedUserId } = loggedUser;
  const includedUsers = users?.filter(user => user.included);
  const excludedUsers = users?.filter(user => !user.included);
  const handleAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent> & React.ChangeEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const clickedUserId = e.target.id;
      const clickedUser = users?.filter(ele => ele.id === clickedUserId)?.[0];
      console.log(clickedUser, users);
      if (clickedUser?.included && type === USER && clickedUserId !== loggedUserId) {
        axios.post(`remove/user/fromChannel`, { channelId: selectedId, userId: clickedUserId });
      } else if (type === USER) {
        axios.post(`add/user/toChannel`, { channelId: selectedId, userId: clickedUserId });
      }
    },
    [users, selectedId, type, loggedUserId]
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
