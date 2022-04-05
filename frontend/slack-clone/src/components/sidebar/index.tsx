import React from 'react';

//components
import { SideBarHeader } from './SideBarHeader';
import { Channels } from './channels/Channels';
import { DirectMessage } from './directMessage/DirectMessage';

//CSS
import './SideBar.css';

//types
import { ActionType, ChannelsInfoType, DirectMessageInfoType } from 'types';

export const SideBar = ({
  onAction,
  channelsInfo,
  directMessagesInfo,
}: {
  onAction: React.Dispatch<ActionType>;
  channelsInfo?: Array<ChannelsInfoType>;
  directMessagesInfo?: Array<DirectMessageInfoType>;
}): React.ReactElement => {
  return (
    <div className="sidebar-container">
      <SideBarHeader />
      <div>
        <Channels onAction={onAction} channelsInfo={channelsInfo} />
        <DirectMessage onAction={onAction} directMessagesInfo={directMessagesInfo} />
      </div>
    </div>
  );
};
