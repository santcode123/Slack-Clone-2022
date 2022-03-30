import React, { useReducer } from 'react';

//components
import { Header } from './header';
import { SideBar } from './sidebar';
import { MessageContainer } from './messageContainer';
import { LoadingFallback } from './LoadingFallback';
import { ErrorFallback } from './ErrorFallback';

//utils
import { reducer } from '../reducer';
import { getLoggedUserInfo } from 'utils';

//hooks
import { useUserContext } from 'hooks/useUserContext';
import { useFetchAllDatabase } from 'hooks/useFetchAllDatabase';

//types
import { SelectedOptionType } from 'types';

//constants
import { LOADING, ERROR } from 'Constants';

// CSS
import './SlackApp.css';

const INITIAL_STATE: { id: string; selectedOptionType: SelectedOptionType } = {
  id: '',
  selectedOptionType: 'channel',
};
export const SlackApp = (): React.ReactElement => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [loggedUser, setLoggedUser] = useUserContext();
  const { userId: loggedUserId = '' } = loggedUser ?? {};
  const { status, data } = useFetchAllDatabase(loggedUserId);

  const isAppRestarted = Object.keys(data?.allUsers ?? {}).length === 0 && !!data;

  const { id, selectedOptionType } = state;

  const { displayName, messageStream, members } = getLoggedUserInfo(loggedUserId, id, selectedOptionType, data);

  if (isAppRestarted) {
    setLoggedUser(null);
  }
  if (status === LOADING) {
    return <LoadingFallback fallbackMessage="please wait..." />;
  }
  if (status === ERROR) {
    return <ErrorFallback errorMessage="error occurred in backend please check" />;
  }
  return (
    <div className="slack">
      <Header />
      <div className="slack-body">
        <SideBar onAction={dispatch} data={data} id={id} />
        <MessageContainer
          id={id}
          displayName={displayName ?? ''}
          messageStream={messageStream ?? []}
          members={members}
          type={selectedOptionType}
          allUsers={data?.allUsers ?? {}}
          onAction={dispatch}
        />
      </div>
    </div>
  );
};
