import React, { createContext, useMemo, useState } from 'react';

type contextType = [string | null, React.Dispatch<React.SetStateAction<string | null>>];
export const UserContext = createContext<contextType | null>(null);

export const ContextProvider = ({ children }: { children: JSX.Element }): React.ReactElement => {
  const [loggedUser, setLoggedUser] = useState<string | null>(null);
  const value = useMemo(() => [loggedUser, setLoggedUser] as contextType, [loggedUser]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
