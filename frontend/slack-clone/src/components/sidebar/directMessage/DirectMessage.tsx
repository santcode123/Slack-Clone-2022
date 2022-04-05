import React, { useCallback, useState } from 'react';

//components
import { SideOptionHeader } from '../SideOptionHeader';
import { SideOptionFooter } from '../SideOptionFooter';
import { SideBarOption } from '../SideBarOption';
import { Modal } from 'components/modal/Modal';

//hooks
import { useUserContext } from 'hooks/useUserContext';

//types
import { ActionType, DirectMessageInfoType } from 'types';

//constants
import { DIRECT_MESSAGE } from 'Constants';

export const DirectMessage = ({
  onAction,
  directMessagesInfo,
}: {
  onAction: React.Dispatch<ActionType>;
  directMessagesInfo?: Array<DirectMessageInfoType>;
}): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapsed = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);
  const handleClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleAddUser = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <div className="direct-message-container">
      <SideOptionHeader isCollapsed={isCollapsed} onClick={handleCollapsed} label="DirectMessage" />
      <Modal
        isOpen={isModalOpen}
        headerTitle="start Direct conversation"
        inputName="Enter UserName"
        footerTitle="submit"
        handleClose={handleClose}
        modalType={DIRECT_MESSAGE}
        onAction={onAction}
      />
      <div className="direct-messages">
        {!isCollapsed &&
          directMessagesInfo?.map(dmInfo => (
            <SideBarOption
              key={dmInfo.dmId}
              id={dmInfo.dmId}
              type={DIRECT_MESSAGE}
              onAction={onAction}
              displayName={dmInfo.displayName}
            />
          ))}
      </div>
      <SideOptionFooter onClick={handleAddUser} label="Add teammates" />
    </div>
  );
};
