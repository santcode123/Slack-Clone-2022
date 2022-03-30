import React, { useState } from 'react';
import axios from 'axios';

//Icons
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

import { SideBarOption } from './SideBarOption';
import { ActionType, ChannelType } from 'types';
import { Modal } from 'components/modal/Modal';

type ChannelsContainer = {
  [id: string]: ChannelType;
};

export const Channels = ({
  userId,
  onAction,
}: {
  userId: string;
  onAction: React.Dispatch<ActionType>;
}): React.ReactElement => {
  const [channelsId, setChannelsId] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [channels, setChannels] = useState<ChannelsContainer>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  React.useEffect(() => {
    async function fetchChannel() {
      const response = await axios.get(`user/channels/${userId}`);
      setChannelsId(response.data.channels);

      response.data.channels.forEach(async (channelId: string) => {
        const response = await axios.get(`channel/${channelId}`);
        const data = await response.data;
        setChannels(prev => ({
          ...prev,
          [channelId]: data,
        }));
      });
    }
    fetchChannel();
  }, [userId]);

  function handleVisible() {
    setIsVisible(prev => !prev);
  }

  function handleClose(isOpen: boolean) {
    setIsModalOpen(isOpen);
  }

  function handleClick() {
    setIsModalOpen(true);
  }

  return (
    <div className="channels-container">
      <Modal
        headerTitle="Create a channel"
        isOpen={isModalOpen}
        inputName="channel"
        footerTitle="create channel"
        handleClose={handleClose}
      />
      <div className="channels-header">
        {isVisible ? <HiChevronDown onClick={handleVisible} /> : <HiChevronUp onClick={handleVisible} />}
        <span>Channels</span>
      </div>
      <div className="channels">
        {isVisible && channelsId.map(id => <SideBarOption key={id} id={id} type="channel" onAction={onAction} />)}
      </div>
      <button className="channels-footer" onClick={handleClick}>
        <span>+</span>
        <span className="add-channel">Add channels</span>
      </button>
    </div>
  );
};
