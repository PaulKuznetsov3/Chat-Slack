import React, { useState, useCallback, useMemo } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const savedUserData = JSON.parse(localStorage.getItem('user'));
  console.log(localStorage);
  const [user, setUser] = useState(
    savedUserData ? { username: savedUserData.username, token: savedUserData.token } : null,
  );
  const logIn = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('UD', userData);
    setUser({ username: userData.username, token: userData.token });
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
