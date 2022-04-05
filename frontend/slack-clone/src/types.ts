export type MessageStreamType = {
  sender: string;
  message: string;
  time: Date;
};

export type SelectedType = 'channel' | 'user' | 'directMessage';
export type Action = 'select' | 'remove';
export type ReducerStateType = {
  selectedId: string;
  selectedType?: SelectedType;
};
export type ActionType = {
  type: Action;
  payload: {
    selectedId: string;
    selectedType?: SelectedType;
  };
};

export type ChannelType = {
  channelName: string;
  messageStream: MessageStreamType[];
  members: string[];
};
export type ChannelsContainer = {
  [id: string]: ChannelType;
};

export type UserType = {
  firstName: string;
  lastName?: string;
  userName: string;
  password: string;
  channels: Array<string>;
  directMessages: Array<string>; // it will contain the id of direct messages
};
export type DirectMessages = {
  [id: string]: {
    directMessageId: string;
    messageStream: Array<MessageStreamType>;
    members: Array<string>;
  };
};

export type ChannelsInfoType = { channelId: string; channelName: string };
export type DirectMessageInfoType = { dmId: string; displayName: string };
export type SelectedInfoType = {
  selectedId: string;
  displayName: string;
  messageStream: Array<MessageStreamType>;
  members: Array<string>;
};

export type UserDataType = {
  channelsInfo?: Array<ChannelsInfoType>;
  directMessagesInfo?: Array<DirectMessageInfoType>;
  selectedInfo?: SelectedInfoType;
};

export type LoggedUserType = { userId: string; displayName: string };
export type ContextType = [LoggedUserType | null, React.Dispatch<React.SetStateAction<LoggedUserType | null>>];

export type LoginOptionType = 'signUp' | 'login';
