import { AuthResponse, LoginCredentials, RegisterData } from '../types/auth.types';

const API_BASE_URL = 'https://api-example.com/v1';

let isNetworkOnline = true;

export const setAuthNetworkMode = (online: boolean) => {
  isNetworkOnline = online;
};

export const AuthApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (!isNetworkOnline) {
      throw new Error('Sem conexão com a internet');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Erro ao fazer login' }));
        throw new Error(error.message || 'Credenciais inválidas');
      }

      return await response.json();
    } catch (error: any) {
      if (error.message === 'Sem conexão com a internet') {
        throw error;
      }
      throw new Error(error.message || 'Erro ao fazer login. Tente novamente.');
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    if (!isNetworkOnline) {
      throw new Error('Sem conexão com a internet');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Erro ao criar conta' }));
        throw new Error(error.message || 'Erro ao criar conta');
      }

      return await response.json();
    } catch (error: any) {
      if (error.message === 'Sem conexão com a internet') {
        throw error;
      }
      throw new Error(error.message || 'Erro ao criar conta. Tente novamente.');
    }
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    if (!isNetworkOnline) {
      throw new Error('Sem conexão com a internet');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Token inválido');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao renovar token');
    }
  },
};

export const AuthApiMock = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (credentials.email === 'teste@teste.com' && credentials.password === '123456') {
      return {
        user: {
          id: '1',
          name: 'Usuário Teste',
          email: 'teste@teste.com',
        },
        token: 'mock_token_123456',
        refreshToken: 'mock_refresh_token_123456',
      };
    }

    throw new Error('Credenciais inválidas');
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (data.password !== data.confirmPassword) {
      throw new Error('As senhas não coincidem');
    }

    if (data.email === 'existente@teste.com') {
      throw new Error('Este email já está em uso');
    }

    return {
      user: {
        id: String(Date.now()),
        name: data.name,
        email: data.email,
      },
      token: `mock_token_${Date.now()}`,
      refreshToken: `mock_refresh_token_${Date.now()}`,
    };
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!refreshToken) {
      throw new Error('Token inválido');
    }

    return {
      user: {
        id: '1',
        name: 'Usuário Teste',
        email: 'teste@teste.com',
      },
      token: `mock_token_new_${Date.now()}`,
      refreshToken: `mock_refresh_token_new_${Date.now()}`,
    };
  },
};
