import {
  Ticket,
  TicketListParams,
  TicketListResponse,
  Comment,
} from '../types/ticket.types';
import { handleWithErrorOfApi } from '../utils/apiErrorHandler';
import { TicketApiMock } from './TicketApi.mock';

const API_BASE_URL = 'https://api-example.com/v1';

const USE_MOCK = typeof __DEV__ !== 'undefined' ? __DEV__ : true;

const buildQueryString = (params: TicketListParams): string => {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.status) queryParams.append('status', params.status);
  if (params.search) queryParams.append('search', params.search);
  if (params.sort) queryParams.append('sort', params.sort);
  
  return queryParams.toString();
};

const handleApiResponse = async <T>(response: Response, context: string): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw handleWithErrorOfApi(
      {
        message: errorData.message || `HTTP error! status: ${response.status}`,
        status: response.status,
      },
      context
    );
  }
  
  return response.json();
};

const TicketApiReal = {
  list: async (params?: TicketListParams): Promise<TicketListResponse> => {
    try {
      const queryString = params ? `?${buildQueryString(params)}` : '';
      const response = await fetch(`${API_BASE_URL}/tickets${queryString}`);
      return handleApiResponse<TicketListResponse>(response, 'TicketApi.list');
    } catch (error) {
      throw handleWithErrorOfApi(error, 'TicketApi.list');
    }
  },
  
  getById: async (id: string | number): Promise<Ticket> => {
    try {
      const response = await fetch(`${API_BASE_URL}/tickets/${id}`);
      return handleApiResponse<Ticket>(response, 'TicketApi.getById');
    } catch (error) {
      throw handleWithErrorOfApi(error, 'TicketApi.getById');
    }
  },
  
  create: async (ticketData: Partial<Ticket>): Promise<Ticket> => {
    try {
      const response = await fetch(`${API_BASE_URL}/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });
      return handleApiResponse<Ticket>(response, 'TicketApi.create');
    } catch (error) {
      throw handleWithErrorOfApi(error, 'TicketApi.create');
    }
  },
  
  update: async (id: string | number, ticketData: Partial<Ticket>): Promise<Ticket> => {
    try {
      const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });
      return handleApiResponse<Ticket>(response, 'TicketApi.update');
    } catch (error) {
      throw handleWithErrorOfApi(error, 'TicketApi.update');
    }
  },
  
  addComment: async (id: string | number, text: string): Promise<Comment> => {
    try {
      const response = await fetch(`${API_BASE_URL}/tickets/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      return handleApiResponse<Comment>(response, 'TicketApi.addComment');
    } catch (error) {
      throw handleWithErrorOfApi(error, 'TicketApi.addComment');
    }
  },
  
  uploadAttachment: async (id: string | number, file: unknown): Promise<unknown> => {
    try {
      const formData = new FormData();
      formData.append('file', file as Blob);
      
      const response = await fetch(`${API_BASE_URL}/tickets/${id}/attachments`, {
        method: 'POST',
        body: formData,
      });
      return handleApiResponse<unknown>(response, 'TicketApi.uploadAttachment');
    } catch (error) {
      throw handleWithErrorOfApi(error, 'TicketApi.uploadAttachment');
    }
  },
};

export const TicketApi = USE_MOCK ? TicketApiMock : TicketApiReal;

