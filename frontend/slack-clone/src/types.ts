export type MessageStreamType = {
  sender: string;
  message: string;
};

export type ReducerStateType = {
  id: string;
  displayName: string;
  messageStream: MessageStreamType[];
  members?: string[];
};
export type ActionType = {
  type: string;
  payload: {
    id: string;
    displayName?: string;
    messageStream?: MessageStreamType[];
    members?: string[];
  };
};

export type ChannelType = {
  channelName: string;
  messageStream: MessageStreamType[];
  members: string[];
};
