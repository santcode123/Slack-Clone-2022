import React from 'react';

//components
import { Header } from './Header';
import { MessageBody } from './MessageBody';
import { Footer } from './Footer';

//types
import { MessageStreamType } from 'types';
export const MessageContainer = ({
  displayName,
  messageStream,
  members,
}: {
  displayName: string;
  messageStream: MessageStreamType[];
  members?: string[];
}) => {
  return (
    <div className="message-container">
      <Header displayName={displayName} members={members} />
      <MessageBody messageStream={messageStream} />
      <Footer />
    </div>
  );
};
