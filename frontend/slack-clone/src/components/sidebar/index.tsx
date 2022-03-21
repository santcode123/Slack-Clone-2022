import React from 'react';

//components
import { SideBarHeader } from './SideBarHeader';
import { Channels } from './Channels';

//CSS
import './SideBar.css';
import { useUserContext } from 'hooks/useUserContext';
import { ActionType } from 'types';

export const SideBar = ({ onAction }: { onAction: React.Dispatch<ActionType> }): React.ReactElement => {
  const [currentUserId] = useUserContext();

  return (
    <div className="sidebar-container">
      <SideBarHeader />
      <Channels userId={currentUserId ?? ''} onAction={onAction} />

      {/* <div className="direct-message"></div> */}
    </div>
  );
};
