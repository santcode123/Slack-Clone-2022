import React from 'react';
import { SelectedOptionType } from 'types';

//constants
import { CHANNEL } from '../../../Constants';

export const HeaderLeft = ({
  type,
  displayName,
}: {
  type: SelectedOptionType;
  displayName: string;
}): React.ReactElement => {
  return (
    <div className="messageContainer-header-left">
      {type === CHANNEL ? (
        '#'
      ) : (
        <img
          className="header-image"
          src="https://camo.githubusercontent.com/eb6a385e0a1f0f787d72c0b0e0275bc4516a261b96a749f1cd1aa4cb8736daba/68747470733a2f2f612e736c61636b2d656467652e636f6d2f64663130642f696d672f617661746172732f6176615f303032322d3531322e706e67"
          width={40}
          height={40}
          alt="headerImage"
        />
      )}
      <div>{displayName}</div>
    </div>
  );
};
