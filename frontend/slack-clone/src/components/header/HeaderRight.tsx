import React from 'react';

//hooks
import { useLoggedUserContext } from 'hooks/useUserContext';

export const HeaderRight = () => {
  const [loggedUser] = useLoggedUserContext();
  const { displayName } = loggedUser;
  return (
    <div className="header-right">
      <div className="user-name">{displayName}</div>
      <i className="fa fa-question-circle fa-lg" aria-hidden="true"></i>
      <img
        className="profile-image"
        src="https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_250,q_auto:good,w_250/v1/gcs/platform-data-slack/avatars/vaibhav_shrivastava.png"
        width={40}
        height={40}
        alt="profile"
      />
    </div>
  );
};
