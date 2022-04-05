import React, { useRef } from 'react';

//components
import { Header } from './header/Header';
import { MessageBody } from './MessageBody';
import { Footer } from './Footer';

//types
import { MessageStreamType, UserType, ActionType, SelectedType } from 'types';

//CSS
import './MessageContainer.css';

export const MessageContainer = ({
  selectedId,
  displayName,
  messageStream,
  members,
  type,
  onAction,
}: {
  selectedId: string;
  displayName: string;
  messageStream: MessageStreamType[];
  members: string[];
  type?: SelectedType;
  onAction: React.Dispatch<ActionType>;
}) => {
  const messageRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="message-container">
      <Header displayName={displayName} members={members} type={type} selectedId={selectedId} onAction={onAction} />
      <MessageBody messageStream={messageStream} ref={messageRef} />
      <Footer id={selectedId} type={type} ref={messageRef} />
    </div>
  );
};
