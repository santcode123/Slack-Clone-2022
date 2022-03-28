import React, { useState, useCallback } from 'react';

// components
import { SignUp } from './signUp/SignUp';
import { Login } from './login/Login';
import { LoginOption } from './LoginOption';

//constants
import { SIGN_UP, LOGIN } from '../../Constants';

//types
import { LoginOptionType } from 'types';

//CSS
import './LoginPage.css';

export const LoginPage = (): React.ReactElement => {
  const [status, setStatus] = useState<LoginOptionType>(SIGN_UP);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent> & React.ChangeEvent<HTMLButtonElement>) => {
      if (e.target.id === SIGN_UP) {
        setStatus(SIGN_UP);
      } else {
        setStatus(LOGIN);
      }
    },
    []
  );

  return (
    <div className="login-page">
      <div className="header">Please login or signUp</div>
      <div className="body">{status === SIGN_UP ? <SignUp /> : <Login />}</div>
      <div className="footer">
        <div className="login-options">
          <LoginOption id="login" label="Login" className="login-button" onClick={handleClick} />
          <LoginOption id="signUp" label="SignUp" className="signUp-button" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};
