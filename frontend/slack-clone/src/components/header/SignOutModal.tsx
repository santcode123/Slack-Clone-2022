import React, { useCallback } from 'react';

//hooks
import { useUserContext } from 'hooks/useUserContext';

export const SignOutModal = ({ isOpen }: { isOpen: boolean }): React.ReactElement => {
  const [, setLoggedUser] = useUserContext();

  const handleLogOut = useCallback(() => {
    setLoggedUser(null);
  }, [setLoggedUser]);

  return (
    <>
      {isOpen ? (
        <div className="signOut-modal-container" onClick={handleLogOut}>
          <button>SignOut</button>
        </div>
      ) : null}
    </>
  );
};
