
import React, { createContext, useContext, useState } from 'react';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : { name: '' };
  });


  const logout = () => {
    setUser({ name: '' });
    localStorage.removeItem('user');
  };

  const login = (user) =>
  {
    setUser({name: user})
    localStorage.setItem('user', JSON.stringify({ name: user }));
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider value={{ user, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
