import React, { useCallback, useState } from 'react';

//components
import { SideOptionHeader } from '../SideOptionHeader';
import { SideOptionFooter } from '../SideOptionFooter';
import { SideBarOption } from '../SideBarOption';
import { Modal } from 'components/modal/Modal';

//hooks
import { useUserContext } from 'hooks/useUserContext';

//types
import { ActionType, UserType } from 'types';

//constants
import { USER } from 'Constants';

export const DirectMessage = ({
  onAction,
  directUsersId,
  allUsers,
  id,
}: {
  onAction: React.Dispatch<ActionType>;
  directUsersId: Array<string>;
  allUsers: Record<string, UserType>;
  id: string;
}): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const users = Object.keys(allUsers).map(id => ({
    id,
    displayName: allUsers[id].firstName + ' ' + allUsers[id].lastName,
    included: directUsersId?.includes(id) ?? false,
  }));

  const directUsers = directUsersId.map(id => ({
    userId: id,
    displayName: allUsers[id].firstName + ' ' + allUsers[id].lastName,
  }));

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
        handleClose={handleClose}
        users={users}
        selectedId={id}
        modalType="user"
        onAction={onAction}
      />
      <div className="direct-messages">
        {!isCollapsed &&
          directUsers?.map(user => (
            <SideBarOption
              key={user.userId}
              id={user.userId}
              type={USER}
              onAction={onAction}
              displayName={user.displayName}
            />
          ))}
      </div>
      <SideOptionFooter onClick={handleAddUser} label="Add teammates" />
    </div>
  );
};
