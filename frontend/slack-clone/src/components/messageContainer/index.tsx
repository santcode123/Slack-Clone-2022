import React, { useRef } from 'react';

//components
import { Header } from './header/Header';
import { MessageBody } from './MessageBody';
import { Footer } from './Footer';

//types
import { MessageStreamType, UserType, ActionType, SelectedOptionType } from 'types';

//CSS
import './MessageContainer.css';

export const MessageContainer = ({
  id,
  displayName,
  messageStream,
  members,
  type,
  allUsers,
  onAction,
}: {
  id: string;
  displayName: string;
  messageStream: MessageStreamType[];
  members?: string[];
  type: SelectedOptionType;
  allUsers: Record<string, UserType>;
  onAction: React.Dispatch<ActionType>;
}) => {
  const messageRef = useRef<HTMLDivElement | null>(null);
  if (!id) {
    return (
      <div className="default-message">
        Create a channel or directMessage to start conversation or click on already existed one
      </div>
    );
  }
  return (
    <div className="message-container">
      <Header
        displayName={displayName}
        members={members}
        type={type}
        allUsers={allUsers}
        selectedId={id}
        onAction={onAction}
      />
      <MessageBody messageStream={messageStream} ref={messageRef} />
      <Footer id={id} type={type} ref={messageRef} />
    </div>
  );
};
