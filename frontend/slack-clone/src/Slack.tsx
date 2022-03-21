import React from 'react';
import './Slack.css';

// component
import { LoginPage } from './components/loginPage';
import { SlackApp } from './components';

//hooks
import { useUserContext } from 'hooks/useUserContext';

const Slack = (): React.ReactElement => {
  const [loggedUser] = useUserContext();

  return <div className="slack-app">{!loggedUser ? <LoginPage /> : <SlackApp />}</div>;
};

export default Slack;
