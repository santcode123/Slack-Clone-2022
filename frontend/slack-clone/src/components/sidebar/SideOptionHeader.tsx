import React from 'react';
//Icons
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

export const SideOptionHeader = ({
  isCollapsed,
  label,
  onClick,
}: {
  isCollapsed: boolean;
  label: string;
  onClick: () => void;
}): React.ReactElement => {
  return (
    <div className="sideOption-header-container">
      {!isCollapsed ? <HiChevronDown onClick={onClick} /> : <HiChevronUp onClick={onClick} />}
      <span>{label}</span>
    </div>
  );
};
