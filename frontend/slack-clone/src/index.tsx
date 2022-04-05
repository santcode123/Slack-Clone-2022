import React from 'react';
import ReactDOM from 'react-dom';
import Slack from './Slack';
import { UserContextProvider } from './contextProviders/UserContextProvider';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <Slack />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
