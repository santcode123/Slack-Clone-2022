import React, { useCallback } from 'react';
import axios from 'axios';

//types
import { ActionType, SelectedOptionType } from 'types';

//hooks
import { useUserContext } from 'hooks/useUserContext';

//constants
import { DEFAULT_IMG_URL, CHANNEL, USER, REMOVE, SELECT } from 'Constants';

export const SideBarOption = ({
  id,
  type,
  onAction,
  displayName,
  members,
}: {
  id: string;
  type: SelectedOptionType;
  onAction: React.Dispatch<ActionType>;
  displayName: string;
  members?: Array<string>;
}): React.ReactElement => {
  const [loggedUser] = useUserContext();
  const { userId: loggedUserId = '' } = loggedUser ?? {};
  const handleClick = useCallback(() => {
    onAction({
      type: SELECT,
      payload: {
        id,
        selectedOptionType: type,
      },
    });
  }, [id, type, onAction]);

  const handleRemove = useCallback(
    (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.stopPropagation();
      if (type === CHANNEL) {
        axios.post(`remove/channel/${loggedUserId}`, { channelId: id });
      }
      if (type === USER) {
        axios.post(`remove/directUser/${loggedUserId}`, { directUserId: id });
      }
      onAction({
        type: REMOVE,
        payload: {
          id: '',
        },
      });
    },
    [loggedUserId, id, type, onAction]
  );
  return (
    <div className="side-option" onClick={handleClick}>
      <span>{type === CHANNEL ? '#' : <img src={DEFAULT_IMG_URL} width={20} height={20} alt="profile" />}</span>
      <div className="side-option-displayName">{`${displayName} ${loggedUserId === id ? '(you)' : ''}`}</div>
      <span className="close-side-option" onClick={handleRemove}>
        X
      </span>
    </div>
  );
};
