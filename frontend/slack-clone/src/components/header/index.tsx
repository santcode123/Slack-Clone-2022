import React from 'react';
import { MdSchedule } from 'react-icons/md';

//CSS
import './Header.css';

export const Header = (): React.ReactElement => {
  return (
    <div className="header-container">
      <div className="header-left">
        <MdSchedule size={25} />
      </div>
      <div className="header-middle">
        <div>
          <i className="fa fa-search search-icon" aria-hidden="true"></i>
        </div>
        <input type="search" placeholder="Sprinklr search"></input>
      </div>
      <div className="header-right">
        <i className="fa fa-question-circle fa-lg" aria-hidden="true"></i>
        <img
          className="profile-image"
          src="https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_250,q_auto:good,w_250/v1/gcs/platform-data-slack/avatars/vaibhav_shrivastava.png"
          width={40}
          height={40}
          alt="profile"
        />
      </div>
    </div>
  );
};
