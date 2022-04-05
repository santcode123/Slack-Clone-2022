import React, { useCallback } from 'react';
import axios from 'axios';

//types
import { ActionType, SelectedType } from 'types';

//hooks
import { useLoggedUserContext } from 'hooks/useUserContext';

//constants
import { DEFAULT_IMG_URL, CHANNEL, REMOVE, SELECT, DIRECT_MESSAGE } from 'Constants';

export const SideBarOption = ({
  id,
  type,
  onAction,
  displayName,
}: {
  id: string;
  type: SelectedType;
  onAction: React.Dispatch<ActionType>;
  displayName: string;
}): React.ReactElement => {
  const [loggedUser] = useLoggedUserContext();
  const { userId: loggedUserId } = loggedUser;

  const handleClick = useCallback(() => {
    onAction({
      type: SELECT,
      payload: {
        selectedId: id,
        selectedType: type,
      },
    });
  }, [id, type, onAction]);

  const handleRemove = useCallback(
    (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.stopPropagation();
      if (type === CHANNEL) {
        axios.post(`remove/channel/${loggedUserId}`, { channelId: id });
      }
      if (type === DIRECT_MESSAGE) {
        axios.post(`remove/directMessage/${loggedUserId}`, { directMessageId: id });
      }
      onAction({
        type: REMOVE,
        payload: {
          selectedId: '',
        },
      });
    },
    [loggedUserId, id, type, onAction]
  );
  return (
    <div className="side-option" onClick={handleClick}>
      <span>{type === CHANNEL ? '#' : <img src={DEFAULT_IMG_URL} width={20} height={20} alt="profile" />}</span>
      <div className="side-option-displayName">{displayName}</div>
      <span className="close-side-option" onClick={handleRemove}>
        X
      </span>
    </div>
  );
};
