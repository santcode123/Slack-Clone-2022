import { useContext } from 'react';
import { UserContext } from '../contextProvider';

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw Error('please use useUserContext inside the UserContextProvider');
  }
  return context;
}
