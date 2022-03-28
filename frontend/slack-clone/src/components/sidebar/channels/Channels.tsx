import React, { useCallback, useState } from 'react';

//components
import { SideOptionHeader } from '../SideOptionHeader';
import { SideBarOption } from '../SideBarOption';
import { ActionType, ChannelType } from 'types';
import { Modal } from 'components/modal/Modal';
import { SideOptionFooter } from '../SideOptionFooter';

//constants
import { CHANNEL } from 'Constants';

export const Channels = ({
  onAction,
  channels,
}: {
  onAction: React.Dispatch<ActionType>;
  channels?: Array<Partial<ChannelType> & { id: string }>;
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
        inputName="Channel"
        footerTitle="Create a channel"
        handleClose={handleClose}
        modalType={CHANNEL}
        onAction={onAction}
      />
      <SideOptionHeader isCollapsed={isCollapsed} onClick={handleCollapsed} label="Channels" />
      <div className="channels">
        {!isCollapsed &&
          channels?.map(channel => (
            <SideBarOption
              key={channel.id}
              id={channel.id}
              type="channel"
              onAction={onAction}
              displayName={channel.channelName ?? ''}
              members={channel.members}
            />
          ))}
      </div>
      <SideOptionFooter onClick={handleAddChannel} label="Add channels" />
    </div>
  );
};
