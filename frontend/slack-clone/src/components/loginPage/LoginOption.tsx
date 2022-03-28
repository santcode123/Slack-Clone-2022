import React from 'react';

export const LoginOption = ({
  onClick,
  className,
  id,
  label,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> & React.ChangeEvent<HTMLButtonElement>) => void;
  className: string;
  id: string;
  label: string;
}): React.ReactElement => {
  return (
    <button onClick={onClick} className={className} id={id}>
      {label}
    </button>
  );
};
