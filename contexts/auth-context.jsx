'use client';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { profileApi } from '../services/api';
import { useLoginMutation, useLogoutMutation, useMeQuery } from '../hooks/useAccountQueries';
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
  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true
  });
  const meQuery = useMeQuery(Boolean(authState.token));

  const refreshAuth = async () => { 
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await profileApi.getProfile();
      const user = response.data?.data ?? response.data;
      
      setAuthState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      await AsyncStorage.multiRemove(['token', 'userData']);
      setAuthState({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  useEffect(() => {
    if (meQuery.data) {
      setAuthState((previous) => ({ ...previous, user: meQuery.data, isAuthenticated: true, isLoading: false }));
      AsyncStorage.setItem('userData', JSON.stringify(meQuery.data));
    }
  }, [meQuery.data]);

  const login = async (credentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      const response = await loginMutation.mutateAsync(credentials);
      const { user, token } = response.data?.data ?? response.data;
      
      // Extract the actual token (remove "Bearer " prefix if it exists)
      const cleanToken = token?.startsWith('Bearer ') ? token.substring(7) : token;
      
      // Store in localStorage
      await AsyncStorage.setItem('token', cleanToken);
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      
      setAuthState({
        user,
        token: cleanToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } finally {
      await AsyncStorage.multiRemove(['token', 'userData']);
    }
    
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
