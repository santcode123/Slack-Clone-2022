import React from 'react';

export const User = ({
  user,
  handleAction,
}: {
  user: { id: string; displayName: string; included: boolean };
  handleAction: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> & React.ChangeEvent<HTMLButtonElement>) => void;
}): React.ReactElement => {
  return (
    <div className="add-remove-users">
      <div>{user.displayName}</div>
      <button onClick={handleAction} id={user.id}>
        {user.included ? '-' : '+'}
      </button>
    </div>
  );
};
