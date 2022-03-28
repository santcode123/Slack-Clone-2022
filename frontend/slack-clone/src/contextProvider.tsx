import React, { createContext, useMemo, useState } from 'react';

//types
import { LoggedUserType, ContextType } from 'types';
export const UserContext = createContext<ContextType | null>(null);

export const ContextProvider = ({ children }: { children: JSX.Element }): React.ReactElement => {
  const [loggedUser, setLoggedUser] = useState<LoggedUserType | null>(null);
  const value = useMemo(() => [loggedUser, setLoggedUser] as ContextType, [loggedUser]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
