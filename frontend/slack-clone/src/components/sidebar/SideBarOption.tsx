import React from 'react';
import axios from 'axios';
import { ActionType } from 'types';

export const SideBarOption = ({
  id,
  type,
  onAction,
}: {
  id: string;
  type: string;
  onAction: React.Dispatch<ActionType>;
}): React.ReactElement => {
  function handleClick() {
    async function fetchChannels() {
      const response = await axios.get(`channel/${id}`);
      const channelData = await response.data;
      onAction({
        type: 'channel',
        payload: {
          id,
          displayName: channelData.channelName,
          messageStream: channelData.messageStream,
          members: channelData.members,
        },
      });
    }
    fetchChannels();
  }
  return <div onClick={handleClick}>{id}</div>;
};
