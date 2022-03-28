import React from 'react';

export const HeaderMiddle = () => {
  return (
    <div className="header-middle">
      <div>
        <i className="fa fa-search search-icon" aria-hidden="true"></i>
      </div>
      <input type="search" placeholder="Sprinklr search" />
    </div>
  );
};
