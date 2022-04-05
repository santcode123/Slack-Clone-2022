import React, { useCallback, useState } from 'react';
import axios from 'axios';

//constants
import { Modal } from 'components/modal/Modal';
import { DIRECT_MESSAGE, USER } from '../../../Constants';

//types
import { ActionType, SelectedType } from 'types';

export const HeaderRight = ({
  type,
  members,
  selectedId,
  onAction,
}: {
  type?: SelectedType;
  members: Array<string>;
  selectedId: string;
  onAction: React.Dispatch<ActionType>;
}): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allUsers, setAllUsers] = useState<Array<{ userId: string; displayName: string }>>([]);

  const users = allUsers.map(user => ({
    id: user.userId,
    displayName: user.displayName,
    included: members?.includes(user.userId),
  }));

  const handleClick = useCallback(() => {
    if (!isModalOpen) {
      axios.get('get/allUsers').then(res => {
        setAllUsers(res.data.allUsers);
      });
    }
    setIsModalOpen(prev => !prev);
  }, [isModalOpen]);
  const handleClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  let Comp;
  if (type === DIRECT_MESSAGE) {
    Comp = <div>Call</div>;
  } else {
    Comp = (
      <button onClick={handleClick} className="members-number">
        {members?.length}
      </button>
    );
  }

  return (
    <div className="messageContainer-header-right">
      <Modal
        isOpen={isModalOpen}
        headerTitle="Add or remove a user to the channel"
        handleClose={handleClose}
        users={users}
        selectedId={selectedId}
        modalType={USER}
        onAction={onAction}
      />
      {Comp}
    </div>
  );
};
