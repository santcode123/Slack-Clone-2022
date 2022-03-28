import React from 'react';

// component
import { LoginPage } from './components/loginPage';
import { SlackApp } from './components';

//hooks
import { useUserContext } from 'hooks/useUserContext';

//Css
import './Slack.css';

const Slack = (): React.ReactElement => {
  const [loggedUser] = useUserContext();

  return <div className="slack-app">{!loggedUser ? <LoginPage /> : <SlackApp />}</div>;
};

export default Slack;
