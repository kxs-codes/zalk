// AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context for authentication
const AuthContext = createContext();

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Initialize state with token from localStorage or null
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('accessToken');
    return savedToken ? JSON.parse(savedToken) : null;
  });


  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
