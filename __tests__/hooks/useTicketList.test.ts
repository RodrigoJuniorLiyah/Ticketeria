import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useTicketList } from '../../src/hooks/useTicketList';
import { fetchTickets } from '../../src/pages/Ticketeria/fetchData';
import { ticketStorage } from '../../src/helpers/ticketStorage';

jest.mock('../../src/pages/Ticketeria/fetchData');
jest.mock('../../src/helpers/ticketStorage');

const mockFetchTickets = fetchTickets as jest.MockedFunction<typeof fetchTickets>;
const mockTicketStorage = ticketStorage as jest.Mocked<typeof ticketStorage>;

describe('useTicketList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockTicketStorage.getUserPreferences = jest.fn().mockResolvedValue(null);
    mockTicketStorage.getTicketsList = jest.fn().mockResolvedValue(null);
  });

  it('deve inicializar com estado correto', () => {
    mockFetchTickets.mockResolvedValueOnce({
      data: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    });

    const { result } = renderHook(() => useTicketList());

    expect(result.current.loading).toBe(true);
    expect(result.current.tickets).toEqual([]);
  });

  it('deve aplicar filtro de status inicial', () => {
    mockFetchTickets.mockResolvedValueOnce({
      data: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    });

    const { result } = renderHook(() => useTicketList({ initialStatusFilter: 'open' }));

    expect(result.current.statusFilter).toBe('open');
  });

  it('deve aplicar busca inicial', () => {
    mockFetchTickets.mockResolvedValueOnce({
      data: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    });

    const { result } = renderHook(() => useTicketList({ initialSearch: 'test' }));

    expect(result.current.searchText).toBe('test');
  });
});

