import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Slack from './Slack';
import { ContextProvider } from './contextProvider';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <Slack />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
