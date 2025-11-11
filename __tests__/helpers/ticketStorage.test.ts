import AsyncStorage from '@react-native-async-storage/async-storage';
import { ticketStorage } from '../../src/helpers/ticketStorage';
import { Ticket, TicketListResponse } from '../../src/types/ticket.types';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('ticketStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveTicketsList', () => {
    it('deve salvar lista de tickets corretamente', async () => {
      const mockData: TicketListResponse = {
        data: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      };

      await ticketStorage.saveTicketsList(mockData);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@ticketeria:tickets_list',
        JSON.stringify(mockData),
      );
    });

    it('deve lidar com erro ao salvar', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));

      const mockData: TicketListResponse = {
        data: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      };

      await ticketStorage.saveTicketsList(mockData);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getTicketsList', () => {
    it('deve retornar lista de tickets quando existe no storage', async () => {
      const mockData: TicketListResponse = {
        data: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      };

      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockData));

      const result = await ticketStorage.getTicketsList();

      expect(result).toEqual(mockData);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@ticketeria:tickets_list');
    });

    it('deve retornar null quando não existe no storage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const result = await ticketStorage.getTicketsList();

      expect(result).toBeNull();
    });

    it('deve lidar com erro ao buscar', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));

      const result = await ticketStorage.getTicketsList();

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('saveTicketDetails', () => {
    it('deve salvar detalhes do ticket corretamente', async () => {
      const mockTicket: Ticket = {
        id: '1',
        title: 'Test Ticket',
        description: 'Test Description',
        category: 'Bug',
        priority: 'high',
        status: 'open',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      };

      await ticketStorage.saveTicketDetails('1', mockTicket);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@ticketeria:ticket_details:1',
        JSON.stringify(mockTicket),
      );
    });
  });

  describe('getTicketDetails', () => {
    it('deve retornar ticket quando existe no storage', async () => {
      const mockTicket: Ticket = {
        id: '1',
        title: 'Test Ticket',
        description: 'Test Description',
        category: 'Bug',
        priority: 'high',
        status: 'open',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      };

      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockTicket));

      const result = await ticketStorage.getTicketDetails('1');

      expect(result).toEqual(mockTicket);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@ticketeria:ticket_details:1');
    });

    it('deve retornar null quando não existe no storage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const result = await ticketStorage.getTicketDetails('1');

      expect(result).toBeNull();
    });
  });

  describe('clearTicketsList', () => {
    it('deve remover lista de tickets do storage', async () => {
      await ticketStorage.clearTicketsList();

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@ticketeria:tickets_list');
    });
  });

  describe('saveUserPreferences', () => {
    it('deve salvar preferências do usuário corretamente', async () => {
      const preferences = {
        statusFilter: 'open',
        sort: 'createdAt_desc',
      };

      await ticketStorage.saveUserPreferences(preferences);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@ticketeria:user_preferences',
        JSON.stringify(preferences),
      );
    });
  });

  describe('getUserPreferences', () => {
    it('deve retornar preferências quando existem no storage', async () => {
      const preferences = {
        statusFilter: 'open',
        sort: 'createdAt_desc',
      };

      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(preferences));

      const result = await ticketStorage.getUserPreferences();

      expect(result).toEqual(preferences);
    });

    it('deve retornar null quando não existem preferências', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const result = await ticketStorage.getUserPreferences();

      expect(result).toBeNull();
    });
  });
});
