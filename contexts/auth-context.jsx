'use client';

import { authApi, profileApi } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true
  });

  const refreshAuth = async () => { 
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await profileApi.getProfile();
      const user = response.data;
      
      setAuthState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      // Token is invalid, clear everything
    }
  };

  useEffect(async () => {
    // Check for existing token on app load
    const token = await AsyncStorage.getItem('token');
    const userData = await AsyncStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setAuthState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
        
        // Verify token is still valid by fetching profile
        refreshAuth().catch(() => {
          // If refresh fails, user will be logged out
        });
      } catch (error) {

      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      const response = await authApi.login(credentials);
      const { user, token } = response.data.data;
      
      // Extract the actual token (remove "Bearer " prefix if it exists)
      const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token;
      
      // Store in localStorage
      await AsyncStorage.setItem('token', cleanToken);
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      
      setAuthState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = async () => {
    // Clear localStorage
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userData');
    
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateUser = async (user) => {
    setAuthState(prev => ({ ...prev, user }));
    await AsyncStorage.setItem('userData', JSON.stringify(user));
  };

  const value = {
    ...authState,
    login,
    logout,
    updateUser,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
