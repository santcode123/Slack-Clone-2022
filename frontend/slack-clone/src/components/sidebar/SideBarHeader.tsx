import React from 'react';

// import { IoMdCreate } from 'react-icons/io';
import { HiChevronDown } from 'react-icons/hi';

export const SideBarHeader = (): React.ReactElement => {
  return (
    <div className="sidebar-header">
      <div>
        <span>Sprinklr</span>
        <HiChevronDown />
      </div>
      {/* <IoMdCreate className="edit-icon" /> */}
    </div>
  );
};
