export type MessageStreamType = {
  sender: string;
  message: string;
  time: Date;
};

export type SelectedOptionType = 'channel' | 'user';
export type Action = 'select' | 'remove';
export type ReducerStateType = {
  id: string;
  selectedOptionType: SelectedOptionType;
};
export type ActionType = {
  type: Action;
  payload: {
    id: string;
    selectedOptionType?: SelectedOptionType;
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
  directUsers: Array<string>;
};
export type DirectMessages = {
  [id: string]: {
    messages: Array<MessageStreamType>;
  };
};

export type AllDatabaseType = {
  allChannels: Record<string, ChannelType>;
  allUsers: Record<string, UserType>;
  allDirectMessages: DirectMessages;
  channelsId: Array<string>;
  directUsersId: Array<string>;
};

export type LoggedUserType = { userId: string; displayName: string };
export type ContextType = [LoggedUserType | null, React.Dispatch<React.SetStateAction<LoggedUserType | null>>];

export type LoginOptionType = 'signUp' | 'login';
