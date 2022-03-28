import React from 'react';

//components
import { HeaderLeft } from './HeaderLeft';
import { HeaderMiddle } from './HeaderMiddle';
import { HeaderRight } from './HeaderRight';

//CSS
import './Header.css';

export const Header = (): React.ReactElement => {
  return (
    <div className="header-container">
      <HeaderLeft />
      <HeaderMiddle />
      <HeaderRight />
    </div>
  );
};
