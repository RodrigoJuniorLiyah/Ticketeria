import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AuthContextData, LoginCredentials, RegisterData, User } from '../types/auth.types';
import { AuthApi, AuthApiMock, setAuthNetworkMode } from '../services/AuthApi';
import { authStorage } from '../helpers/authStorage';
import { useNetwork } from './NetworkContext';
import { setAuthToken } from '../services/TicketApi';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const USE_MOCK_API = true;
const api = USE_MOCK_API ? AuthApiMock : AuthApi;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isOnline } = useNetwork();

  useEffect(() => {
    setAuthNetworkMode(isOnline);
  }, [isOnline]);

  const updateAuthState = useCallback((authData: { user: User; token: string } | null) => {
    if (authData) {
      setUser(authData.user);
      setToken(authData.token);
      setAuthToken(authData.token);
    } else {
      setUser(null);
      setToken(null);
      setAuthToken(null);
    }
  }, []);

  const saveAuthData = useCallback(
    async (response: { user: User; token: string }) => {
      await authStorage.saveAuth(response);
      updateAuthState(response);
    },
    [updateAuthState],
  );

  const clearAuthData = useCallback(async () => {
    await authStorage.clearAuth();
    updateAuthState(null);
  }, [updateAuthState]);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const authData = await authStorage.getAuth();
        updateAuthState(authData);
      } catch (error) {
        console.error('Error loading auth:', error);
        updateAuthState(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuth();
  }, [updateAuthState]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        setIsLoading(true);
        const response = await api.login(credentials);
        await saveAuthData(response);
      } catch (error: any) {
        throw new Error(error.message || 'Erro ao fazer login');
      } finally {
        setIsLoading(false);
      }
    },
    [saveAuthData],
  );

  const register = useCallback(
    async (data: RegisterData) => {
      try {
        setIsLoading(true);
        const response = await api.register(data);
        await saveAuthData(response);
      } catch (error: any) {
        throw new Error(error.message || 'Erro ao criar conta');
      } finally {
        setIsLoading(false);
      }
    },
    [saveAuthData],
  );

  const logout = useCallback(async () => {
    try {
      await clearAuthData();
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao fazer logout');
    }
  }, [clearAuthData]);

  const updateUser = useCallback(
    async (updatedUser: Partial<User>) => {
      if (!user) return;

      const newUser = { ...user, ...updatedUser };
      setUser(newUser);
      await authStorage.saveUser(newUser);
    },
    [user],
  );

  const isAuthenticated = useMemo(() => !!user && !!token, [user, token]);

  const value: AuthContextData = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      isLoading,
      login,
      register,
      logout,
      updateUser,
    }),
    [user, token, isAuthenticated, isLoading, login, register, logout, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
