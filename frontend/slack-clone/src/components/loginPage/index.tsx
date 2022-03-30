import React, { useState } from 'react';

// components
import { SignUp } from './SignUp';
import { Login } from './Login';

//constants
import { SIGN_UP, LOGIN } from '../../constants';

//CSS
import './LoginPage.css';

export const LoginPage = (): React.ReactElement => {
  const [status, setStatus] = useState(SIGN_UP);

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any) {
    if (e.target.id === SIGN_UP) {
      setStatus(SIGN_UP);
    } else {
      setStatus(LOGIN);
    }
  }

  return (
    <div className="login-page">
      <div className="header">please login or signUp</div>
      <div className="body">{status === SIGN_UP ? <SignUp /> : <Login />}</div>
      <div className="footer">
        <div className="login-options">
          <button onClick={handleClick} className="login-button" id="login">
            Login
          </button>
          <button onClick={handleClick} className="signUp-button" id="signUp">
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};
