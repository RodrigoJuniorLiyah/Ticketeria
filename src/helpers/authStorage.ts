import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthResponse } from '../types/auth.types';

const AUTH_STORAGE_KEY = '@ticketeria:auth';
const TOKEN_STORAGE_KEY = '@ticketeria:token';
const REFRESH_TOKEN_STORAGE_KEY = '@ticketeria:refresh_token';
const USER_STORAGE_KEY = '@ticketeria:user';

export const authStorage = {
  async saveAuth(authData: AuthResponse): Promise<void> {
    try {
      const items: [string, string][] = [
        [TOKEN_STORAGE_KEY, authData.token],
        [USER_STORAGE_KEY, JSON.stringify(authData.user)],
      ];
      
      if (authData.refreshToken) {
        items.push([REFRESH_TOKEN_STORAGE_KEY, authData.refreshToken]);
      }
      
      await AsyncStorage.multiSet(items);
    } catch (error) {
      console.error('Error saving auth:', error);
      throw new Error('Erro ao salvar dados de autenticação');
    }
  },

  async getAuth(): Promise<AuthResponse | null> {
    try {
      const [token, userString, refreshToken] = await AsyncStorage.multiGet([
        TOKEN_STORAGE_KEY,
        USER_STORAGE_KEY,
        REFRESH_TOKEN_STORAGE_KEY,
      ]);

      if (!token[1] || !userString[1]) {
        return null;
      }

      const user: User = JSON.parse(userString[1]);

      return {
        user,
        token: token[1],
        ...(refreshToken[1] ? { refreshToken: refreshToken[1] } : {}),
      };
    } catch (error) {
      console.error('Error getting auth:', error);
      return null;
    }
  },

  async clearAuth(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        TOKEN_STORAGE_KEY,
        USER_STORAGE_KEY,
        REFRESH_TOKEN_STORAGE_KEY,
        AUTH_STORAGE_KEY,
      ]);
    } catch (error) {
      console.error('Error clearing auth:', error);
      throw new Error('Erro ao limpar dados de autenticação');
    }
  },

  async saveUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
      throw new Error('Erro ao salvar dados do usuário');
    }
  },
};


