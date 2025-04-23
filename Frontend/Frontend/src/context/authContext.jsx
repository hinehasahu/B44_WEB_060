
import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    user: null, // { name, email, role }
  });

  const login = (userData) => {
    setAuth({
      isLoggedIn: true,
      user: userData,
    });
  };

  const logout = () => {
    setAuth({
      isLoggedIn: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
