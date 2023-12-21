
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : { name: '' };
  });

  const [role, setRole] = useState('visitor')

  useEffect(() => {
    //Checking if user is an admin
    if (user.name) {
      axios.get(`/api/userRole/${user.name}`)
        .then((res) => {
          setRole(res.data.role);
        })
        .catch((error) => {
          console.error("Error fetching user role:", error);
        });
    }
    else
    {
      setRole('visitor')
    }
  }, [user]);

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
    <AuthContext.Provider value={{ user, logout, login, role }}>
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
