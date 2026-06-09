import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Kiểm tra token hết hạn
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser({
            id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
            email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
            name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
            role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
          });
        }
      } catch (error) {
        console.error("Invalid token", error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/Auth/login', { email, password });
    const { token, user: userData } = response.data;
    localStorage.setItem('token', token);
    
    // API returns user details, but we can also decode token
    setUser({
      id: userData.id,
      email: userData.email,
      name: userData.fullName,
      role: userData.role,
    });
    return userData;
  };

  const loginWithGoogle = async (idToken) => {
    const response = await api.post('/Auth/google-login', { idToken });
    const { token, user: userData } = response.data;
    localStorage.setItem('token', token);

    setUser({
      id: userData.id,
      email: userData.email,
      name: userData.fullName,
      role: userData.role,
    });
    return userData;
  };

  const register = async (fullName, email, password) => {
    await api.post('/Auth/register', { fullName, email, password });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
