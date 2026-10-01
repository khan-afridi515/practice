import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // TODO: implement login() and connect it to the user state.
  const login = () => {
    // TODO: setUser(...)
    // TODO: setIsLoggedIn(true)
  };

  // TODO: implement logout() and clear the user state.
  const logout = () => {
    // TODO: setUser(null)
    // TODO: setIsLoggedIn(false)
  };

  const value = { user, isLoggedIn, login, logout };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
