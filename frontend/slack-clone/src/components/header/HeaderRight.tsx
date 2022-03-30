import React, { useCallback, useState } from 'react';

//components
import { SignOutModal } from './SignOutModal';

//hooks
import { useUserContext } from 'hooks/useUserContext';

export const HeaderRight = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loggedUser] = useUserContext();
  const { displayName = '' } = loggedUser ?? {};

  const handleClick = useCallback(() => {
    setIsModalOpen(prev => !prev);
  }, []);

  return (
    <div className="header-right">
      <SignOutModal isOpen={isModalOpen} />
      <div className="user-name">{displayName}</div>
      <i className="fa fa-question-circle fa-lg" aria-hidden="true"></i>
      <img
        onClick={handleClick}
        className="profile-image"
        src="https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_250,q_auto:good,w_250/v1/gcs/platform-data-slack/avatars/vaibhav_shrivastava.png"
        width={35}
        height={35}
        alt="profile"
      />
    </div>
  );
};
