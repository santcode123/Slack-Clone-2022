import React, { useCallback } from 'react';
import axios from 'axios';

//components
import { SideBarHeader } from './SideBarHeader';
import { Channels } from './channels/Channels';
import { DirectMessage } from './directMessage/DirectMessage';

//CSS
import './SideBar.css';

//types
import { ActionType, AllDatabaseType } from 'types';
import { useUserContext } from 'hooks/useUserContext';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const SideBar = ({
  id,
  onAction,
  data,
}: {
  id: string;
  onAction: React.Dispatch<ActionType>;
  data: AllDatabaseType | null;
}): React.ReactElement => {
  const { allChannels, allUsers, channelsId, directUsersId } = data ?? {};

  const [, setLoggedUser] = useUserContext();

  const channels = channelsId?.map(id => ({ id, ...allChannels?.[id] }));

  const handleClick = useCallback(() => {
    axios.post(`${BASE_URL}/app/cleanup`).then(res => {
      setLoggedUser(null);
    });
  }, [setLoggedUser]);

  return (
    <div className="sidebar-container">
      <SideBarHeader />
      <div>
        <Channels onAction={onAction} channels={channels} />
        <DirectMessage onAction={onAction} directUsersId={directUsersId ?? []} allUsers={allUsers ?? {}} id={id} />
      </div>
      <button className="restart-app" onClick={handleClick}>
        Restart the App
      </button>
    </div>
  );
};
