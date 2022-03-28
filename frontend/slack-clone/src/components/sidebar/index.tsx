import React from 'react';

//components
import { SideBarHeader } from './SideBarHeader';
import { Channels } from './channels/Channels';
import { DirectMessage } from './directMessage/DirectMessage';

//CSS
import './SideBar.css';

//types
import { ActionType, AllDatabaseType } from 'types';

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

  const channels = channelsId?.map(id => ({ id, ...allChannels?.[id] }));

  return (
    <div className="sidebar-container">
      <SideBarHeader />
      <div>
        <Channels onAction={onAction} channels={channels} />
        <DirectMessage onAction={onAction} directUsersId={directUsersId ?? []} allUsers={allUsers ?? {}} id={id} />
      </div>
    </div>
  );
};
