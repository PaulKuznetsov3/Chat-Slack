import React, { useState, useCallback, useMemo } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const savedUserData = JSON.parse(localStorage.getItem('username'));
  console.log(localStorage);
  const [user, setUser] = useState(
    savedUserData ? { username: savedUserData.username } : null,
  );
  const logIn = useCallback((userData) => {
    localStorage.setItem('username', JSON.stringify(userData));
    setUser({ username: userData.username });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('username');
    setUser(null);
  }, []);
  const providerData = useMemo(
    () => ({
      logIn,
      logOut,
      user,
    }),
    [logIn, logOut, user],
  );
  return (
    <AuthContext.Provider value={providerData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
