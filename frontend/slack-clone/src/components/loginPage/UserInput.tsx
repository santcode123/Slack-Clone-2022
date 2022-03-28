import React from 'react';

//constants
import { INPUT_LABEL } from '../../Constants';

export const UserInput = ({
  id,
  onChange,
  inputValue,
  isRequired,
}: {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue?: string;
  isRequired?: boolean;
}): React.ReactElement => {
  const labelContent = isRequired ? `${INPUT_LABEL[id]} *` : INPUT_LABEL[id];
  return (
    <div className="user-input">
      <label htmlFor={id}>{labelContent}</label>
      <input id={id} type="text" onChange={onChange} value={inputValue} />
    </div>
  );
};
