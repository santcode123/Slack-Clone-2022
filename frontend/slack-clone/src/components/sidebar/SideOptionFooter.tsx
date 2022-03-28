import React from 'react';

export const SideOptionFooter = ({ onClick, label }: { onClick: () => void; label: string }): React.ReactElement => {
  return (
    <button className="sideOption-footer-container" onClick={onClick}>
      <span>+</span>
      <span className="add-option">{label}</span>
    </button>
  );
};
