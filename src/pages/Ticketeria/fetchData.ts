import { TicketApi } from '../../services/TicketApi';
import { ticketStorage } from '../../helpers/ticketStorage';
import { TicketListParams, TicketListResponse } from '../../types/ticket.types';

export const fetchTickets = async (
  params?: TicketListParams,
  useCache = true
): Promise<TicketListResponse> => {
  try {
    if (useCache) {
      const cachedData = await ticketStorage.getTicketsList();
      if (cachedData) {
        return cachedData;
      }
    }

    const response = await TicketApi.list(params);
    
    if (response && response.data) {
      await ticketStorage.saveTicketsList(response);
    }
    
    return response;
  } catch (error) {
    const cachedData = await ticketStorage.getTicketsList();
    if (cachedData && cachedData.data.length > 0) {
      return cachedData;
    }
    
    const isNetworkError = error instanceof Error && (error as any).isNetworkError;
    if (isNetworkError) {
      throw new Error('Sem conexão com a internet. Nenhum dado salvo encontrado.');
    }
    
    throw error;
  }
};

