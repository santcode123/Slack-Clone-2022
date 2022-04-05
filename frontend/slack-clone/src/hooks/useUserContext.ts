import { useContext } from 'react';
import { UserContext } from '../contextProviders/UserContextProvider';

//types
import { LoggedUserType } from 'types';

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw Error('please use useUserContext inside the UserContextProvider');
  }
  return context;
}

export function useLoggedUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw Error('please use useUserContext inside the UserContextProvider');
  }
  const [loggedUser] = context;
  if (!loggedUser) {
    throw Error('please use this hook after user is logged in i.e loggedUser will not be null');
  }
  return context as [LoggedUserType, React.Dispatch<React.SetStateAction<LoggedUserType>>];
}
