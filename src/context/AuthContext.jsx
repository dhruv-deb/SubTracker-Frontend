import React, { createContext, useState, useEffect, useContext } from 'react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5500";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/users/me`, { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkLoggedIn();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch(`${BASE_URL}/api/v1/auth/sign-out`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setUser(null);
      setIsLoggingOut(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    isLoggingOut, // Expose the new state
    login,
    logout,
    BASE_URL
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
