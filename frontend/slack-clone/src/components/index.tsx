import React, { useReducer } from 'react';

//components
import { Header } from './header';
import { SideBar } from './sidebar';
import { MessageContainer } from './messageContainer';

//utils
import { reducer } from '../reducer';

// CSS
import './SlackApp.css';

const INITIAL_STATE = {
  id: 'lsjjd',
  displayName: 'hey man',
  messageStream: [
    { sender: 'lol', message: 'po start' },
    {
      sender: 'vinod',
      message:
        'i am comin sajdh jsabjdasdjhasbdhasbdhgasvdhgasvdhgvdhsagdajshbjhdbsajdbahjdbahsjdbasjdhasbdjasbdhjasbdjasdjashjdbasjhjdbhbhjadhbasvdhasgdvhgasdvhasvdhsgvdhgsadvhsagdvhsadvhasgvdhgasvdhsgadvsahvghdbasd djasdbhgsavd hsahdgvashgdvas dhagsvdhgasvg',
    },
  ],
  members: [],
};
export const SlackApp = (): React.ReactElement => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <div className="slack">
      <Header />
      <SideBar onAction={dispatch} />
      <MessageContainer displayName={state.displayName} messageStream={state.messageStream} members={state.members} />
    </div>
  );
};
