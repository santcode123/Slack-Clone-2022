import { Modal } from 'components/modal/Modal';
import React, { useCallback, useState } from 'react';
import { ActionType, SelectedOptionType, UserType } from 'types';

//constants
import { USER } from '../../../Constants';

export const HeaderRight = ({
  type,
  members,
  allUsers,
  selectedId,
  onAction,
}: {
  type: SelectedOptionType;
  members?: Array<string>;
  allUsers: Record<string, UserType>;
  selectedId: string;
  onAction: React.Dispatch<ActionType>;
}): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const users = Object.keys(allUsers).map(id => ({
    id,
    displayName: allUsers[id].firstName + ' ' + allUsers[id].lastName,
    included: members?.includes(id) ?? false,
  }));

  const handleClick = useCallback(() => {
    setIsModalOpen(prev => !prev);
  }, []);
  const handleClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  let Comp;
  if (type === USER) {
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
        modalType="channel"
        onAction={onAction}
      />
      {Comp}
    </div>
  );
};
