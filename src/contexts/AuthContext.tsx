import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { AuthContextData, LoginCredentials, RegisterData, User } from '../types/auth.types';
import { AuthApi, AuthApiMock } from '../services/AuthApi';
import { authStorage } from '../helpers/authStorage';
import { useNetwork } from './NetworkContext';
import { setAuthToken } from '../services/TicketApi';
import { setAuthNetworkMode } from '../services/AuthApi';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const USE_MOCK_API = true;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isOnline } = useNetwork();

  useEffect(() => {
    setAuthNetworkMode(isOnline);
  }, [isOnline]);

  const saveAuthData = useCallback(async (response: { user: User; token: string }) => {
    await authStorage.saveAuth(response);
    setUser(response.user);
    setToken(response.token);
    setAuthToken(response.token);
  }, []);

  const clearAuthData = useCallback(async () => {
    await authStorage.clearAuth();
    setUser(null);
    setToken(null);
    setAuthToken(null);
  }, []);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const authData = await authStorage.getAuth();
        if (authData) {
          setUser(authData.user);
          setToken(authData.token);
          setAuthToken(authData.token);
        }
      } catch (error) {
        console.error('Error loading auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const api = USE_MOCK_API ? AuthApiMock : AuthApi;
      const response = await api.login(credentials);
      await saveAuthData(response);
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  }, [saveAuthData]);

  const register = useCallback(async (data: RegisterData) => {
    try {
      setIsLoading(true);
      const api = USE_MOCK_API ? AuthApiMock : AuthApi;
      const response = await api.register(data);
      await saveAuthData(response);
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  }, [saveAuthData]);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await clearAuthData();
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao fazer logout');
    } finally {
      setIsLoading(false);
    }
  }, [clearAuthData]);

  const updateUser = useCallback(async (updatedUser: Partial<User>) => {
    if (!user) return;
    
    const newUser = { ...user, ...updatedUser };
    setUser(newUser);
    await authStorage.saveUser(newUser);
  }, [user]);

  const value: AuthContextData = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

