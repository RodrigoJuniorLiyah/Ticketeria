import { TicketApi } from '../../services/TicketApi';
import { ticketStorage } from '../../helpers/ticketStorage';
import { TicketListParams, TicketListResponse } from '../../types/ticket.types';

export const fetchTickets = async (
  params?: TicketListParams,
  useCache = true,
  clearCache = false
): Promise<TicketListResponse> => {
  try {
    if (clearCache) {
      await ticketStorage.clearTicketsList();
    }

    const hasFilters = params?.status || params?.search;
    
    const response = await TicketApi.list(params);
    
    if (response && response.data) {
      if (!hasFilters) {
        await ticketStorage.saveTicketsList(response);
      }
    }
    
    return response;
  } catch (error) {
    const cachedData = await ticketStorage.getTicketsList();
    if (cachedData && cachedData.data.length > 0) {
      if (!params?.status && !params?.search) {
        return cachedData;
      }
    }
    
    const isNetworkError = error instanceof Error && (error as any).isNetworkError;
    if (isNetworkError) {
      throw new Error('Sem conexão com a internet. Nenhum dado salvo encontrado.');
    }
    
    throw error;
  }
};

export const fetchTicketsWithCache = async (
  params?: TicketListParams
): Promise<{ cached?: TicketListResponse; fresh: TicketListResponse }> => {
  const hasFilters = params?.status || params?.search;
  let cached: TicketListResponse | undefined;

  if (!hasFilters) {
    cached = await ticketStorage.getTicketsList() || undefined;
  }

  try {
    const fresh = await TicketApi.list(params);
    
    if (fresh && fresh.data) {
      if (!hasFilters) {
        await ticketStorage.saveTicketsList(fresh);
      }
    }
    
    return { cached, fresh };
  } catch (error) {
    if (cached) {
      return { cached, fresh: cached };
    }
    throw error;
  }
};

