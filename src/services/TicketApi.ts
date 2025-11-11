import { Comment, Ticket, TicketListParams, TicketListResponse } from '../types/ticket.types';
import { handleWithErrorOfApi } from '../utils/apiErrorHandler';
import { TicketApiMock } from './TicketApi.mock';

const API_BASE_URL = 'https://api-example.com/v1';

// Usa mock em desenvolvimento, real em produção
const USE_MOCK = typeof __DEV__ !== 'undefined' ? __DEV__ : true;

let isNetworkOnline = true;
let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

export const setNetworkMode = (online: boolean) => {
  isNetworkOnline = online;
};

export const getNetworkMode = () => isNetworkOnline;

const buildQueryString = (params: TicketListParams): string => {
  const queryParams = new URLSearchParams();

  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.status) queryParams.append('status', params.status);
  if (params.search) queryParams.append('search', params.search);
  if (params.sort) queryParams.append('sort', params.sort);

  return queryParams.toString();
};

const getAuthHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  return headers;
};

const handleApiResponse = async <T>(response: Response, context: string): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw handleWithErrorOfApi(
      {
        message: errorData.message || `HTTP error! status: ${response.status}`,
        status: response.status,
      },
      context,
    );
  }

  return response.json();
};

// Simula erro de rede quando está offline (para testes)
const simulateNetworkError = () => {
  if (!isNetworkOnline) {
    const error = new Error('Network request failed');
    (error as any).isNetworkError = true;
    throw error;
  }
};

const TicketApiReal = {
  list: async (params?: TicketListParams): Promise<TicketListResponse> => {
    simulateNetworkError();
    try {
      const queryString = params ? `?${buildQueryString(params)}` : '';
      const response = await fetch(`${API_BASE_URL}/tickets${queryString}`, {
        headers: getAuthHeaders(),
      });
      return handleApiResponse<TicketListResponse>(response, 'TicketApi.list');
    } catch (error) {
      throw handleWithErrorOfApi(error, 'TicketApi.list');
    }
  },

  getById: async (id: string | number): Promise<Ticket> => {
    simulateNetworkError();
    try {
      const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
        headers: getAuthHeaders(),
      });
      return handleApiResponse<Ticket>(response, 'TicketApi.getById');
    } catch (error) {
      throw handleWithErrorOfApi(error, 'TicketApi.getById');
    }
  },

  create: async (ticketData: Partial<Ticket>): Promise<Ticket> => {
    simulateNetworkError();
    try {
      const response = await fetch(`${API_BASE_URL}/tickets`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(ticketData),
      });
      return handleApiResponse<Ticket>(response, 'TicketApi.create');
    } catch (error) {
      throw handleWithErrorOfApi(error, 'TicketApi.create');
    }
  },

  update: async (id: string | number, ticketData: Partial<Ticket>): Promise<Ticket> => {
    simulateNetworkError();
    try {
      const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(ticketData),
      });
      return handleApiResponse<Ticket>(response, 'TicketApi.update');
    } catch (error) {
      throw handleWithErrorOfApi(error, 'TicketApi.update');
    }
  },

  addComment: async (id: string | number, text: string): Promise<Comment> => {
    simulateNetworkError();
    try {
      const response = await fetch(`${API_BASE_URL}/tickets/${id}/comments`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ text }),
      });
      return handleApiResponse<Comment>(response, 'TicketApi.addComment');
    } catch (error) {
      throw handleWithErrorOfApi(error, 'TicketApi.addComment');
    }
  },

  uploadAttachment: async (id: string | number, file: unknown): Promise<unknown> => {
    simulateNetworkError();
    try {
      const fileData = file as { uri: string; type?: string; name?: string };

      const formData = new FormData();
      formData.append('file', {
        uri: fileData.uri,
        type: fileData.type || 'application/octet-stream',
        name: fileData.name || 'file',
      } as any);

      const headers: HeadersInit = {
        'Content-Type': 'multipart/form-data',
      };

      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const response = await fetch(`${API_BASE_URL}/tickets/${id}/attachments`, {
        method: 'POST',
        body: formData,
        headers,
      });
      return handleApiResponse<unknown>(response, 'TicketApi.uploadAttachment');
    } catch (error) {
      throw handleWithErrorOfApi(error, 'TicketApi.uploadAttachment');
    }
  },
};

export const TicketApi = USE_MOCK ? TicketApiMock : TicketApiReal;
