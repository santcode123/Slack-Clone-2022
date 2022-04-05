import React, { useCallback, useState } from 'react';

//components
import { SideOptionHeader } from '../SideOptionHeader';
import { SideBarOption } from '../SideBarOption';
import { Modal } from 'components/modal/Modal';
import { SideOptionFooter } from '../SideOptionFooter';

//constants
import { CHANNEL } from 'Constants';

//types
import { ActionType, ChannelsInfoType } from 'types';

export const Channels = ({
  onAction,
  channelsInfo,
}: {
  onAction: React.Dispatch<ActionType>;
  channelsInfo?: Array<ChannelsInfoType>;
}): React.ReactElement => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCollapsed = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleAddChannel = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <div className="channels-container">
      <Modal
        headerTitle="Create a channel"
        isOpen={isModalOpen}
        inputName="Channel name"
        footerTitle="Create a channel"
        handleClose={handleClose}
        modalType={CHANNEL}
        onAction={onAction}
      />
      <SideOptionHeader isCollapsed={isCollapsed} onClick={handleCollapsed} label="Channels" />
      <div className="channels">
        {!isCollapsed &&
          channelsInfo?.map(channel => (
            <SideBarOption
              key={channel.channelId}
              id={channel.channelId}
              type={CHANNEL}
              onAction={onAction}
              displayName={channel.channelName}
            />
          ))}
      </div>
      <SideOptionFooter onClick={handleAddChannel} label="Add channels" />
    </div>
  );
};
