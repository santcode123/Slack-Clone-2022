import React from 'react';

//components
import { HeaderLeft } from './HeaderLeft';
import { HeaderRight } from './HeaderRight';

//types
import { UserType, ActionType, SelectedType } from 'types';

export const Header = ({
  displayName,
  members,
  type,
  selectedId,
  onAction,
}: {
  displayName: string;
  members: string[];
  type?: SelectedType;
  selectedId: string;
  onAction: React.Dispatch<ActionType>;
}): React.ReactElement => {
  return (
    <div className="message-container-header">
      <HeaderLeft type={type} displayName={displayName} />
      <HeaderRight type={type} members={members} selectedId={selectedId} onAction={onAction} />
    </div>
  );
};
