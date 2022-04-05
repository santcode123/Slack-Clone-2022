import React, { useReducer } from 'react';

//components
import { Header } from './header';
import { SideBar } from './sidebar';
import { MessageContainer } from './messageContainer';
import { LoadingFallback } from './LoadingFallback';
import { ErrorFallback } from './ErrorFallback';

//utils
import { reducer } from '../reducer';

//hooks
import { useLoggedUserContext } from 'hooks/useUserContext';
import { useFetchUserData } from 'hooks/useFetchUserData';

//types
import { SelectedType } from 'types';

//constants
import { LOADING, ERROR } from 'Constants';

// CSS
import './SlackApp.css';

const INITIAL_STATE: { selectedId: string; selectedType?: SelectedType } = {
  selectedId: '',
};
export const SlackApp = (): React.ReactElement => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [loggedUser] = useLoggedUserContext();
  const { userId: loggedUserId } = loggedUser;

  const { selectedId, selectedType } = state;

  const { status, data } = useFetchUserData(loggedUserId, selectedType, selectedId);

  const chatInfo = data?.selectedInfo;

  if (status === LOADING) return <LoadingFallback fallbackMessage="please wait..." />;

  if (status === ERROR) {
    return <ErrorFallback />;
  }
  return (
    <div className="slack">
      <Header />
      <div className="slack-body">
        <SideBar onAction={dispatch} channelsInfo={data?.channelsInfo} directMessagesInfo={data?.directMessagesInfo} />
        {chatInfo && <MessageContainer {...chatInfo} type={selectedType} onAction={dispatch} />}
      </div>
    </div>
  );
};
