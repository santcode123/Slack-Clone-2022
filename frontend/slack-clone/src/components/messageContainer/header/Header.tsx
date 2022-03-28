import React from 'react';

//components
import { HeaderLeft } from './HeaderLeft';
import { HeaderRight } from './HeaderRight';

//types
import { UserType, ActionType, SelectedOptionType } from 'types';

export const Header = ({
  displayName,
  members,
  type,
  allUsers,
  selectedId,
  onAction,
}: {
  displayName: string;
  members?: string[];
  type: SelectedOptionType;
  allUsers: Record<string, UserType>;
  selectedId: string;
  onAction: React.Dispatch<ActionType>;
}): React.ReactElement => {
  return (
    <div className="message-container-header">
      <HeaderLeft type={type} displayName={displayName} />
      <HeaderRight type={type} members={members} allUsers={allUsers} selectedId={selectedId} onAction={onAction} />
    </div>
  );
};
