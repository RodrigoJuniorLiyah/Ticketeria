import { useState, useEffect, useCallback, useRef } from 'react';

import { fetchTickets } from '../pages/Ticketeria/fetchData';
import { ticketStorage } from '../helpers/ticketStorage';
import { Ticket, TicketListParams } from '../types/ticket.types';

type StatusFilter = 'all' | 'open' | 'in_progress' | 'resolved' | 'closed';

interface UseTicketListParams {
  initialStatusFilter?: StatusFilter;
  initialSearch?: string;
}

export const useTicketList = ({ initialStatusFilter = 'all', initialSearch = '' }: UseTicketListParams = {}) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchText, setSearchText] = useState(initialSearch);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(initialStatusFilter);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  const statusFilterRef = useRef(statusFilter);
  const searchTextRef = useRef(searchText);

  useEffect(() => {
    statusFilterRef.current = statusFilter;
  }, [statusFilter]);

  useEffect(() => {
    searchTextRef.current = searchText;
  }, [searchText]);

  const loadTickets = useCallback(
    async (pageNum = 1, reset = false, useCache = true, currentStatusFilter?: StatusFilter, currentSearchText?: string, isSearch = false) => {
      try {
        if (reset) {
          if (isSearch) {
            setSearching(true);
          } else {
            setLoading(true);
          }
        }

        setError(null);

        const filter = currentStatusFilter ?? statusFilterRef.current;
        const search = currentSearchText ?? searchTextRef.current;

        const params: TicketListParams = {
          page: pageNum,
          limit: 20,
          sort: 'createdAt_desc',
        };

        if (filter !== 'all') {
          params.status = filter;
        }

        if (search.trim()) {
          params.search = search.trim();
        }

        const response = await fetchTickets(params, useCache && pageNum === 1);

        if (reset) {
          setTickets(response.data);
        } else {
          setTickets((prev) => [...prev, ...response.data]);
        }

        setHasMore(response.page < response.totalPages);
        setPage(response.page);
        setIsOffline(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar tickets';
        const isNetworkError = err instanceof Error && (err as any).isNetworkError;
        
        const cachedData = await ticketStorage.getTicketsList();
        if (cachedData && cachedData.data.length > 0) {
          setTickets(cachedData.data);
          setIsOffline(true);
          setError(isNetworkError ? null : errorMessage);
        } else {
          setIsOffline(false);
          if (isNetworkError) {
            setError('Sem conexão com a internet e nenhum dado salvo encontrado.');
          } else {
            setError(errorMessage);
          }
        }
      } finally {
        setLoading(false);
        setSearching(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    loadTickets(1, true, true, statusFilter, searchText, false);
  }, [statusFilter, loadTickets]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchText.trim() || searchText === '') {
        loadTickets(1, true, false, statusFilter, searchText, true);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchText, loadTickets]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadTickets(1, true, false, statusFilterRef.current, searchTextRef.current);
  }, [loadTickets]);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore && !refreshing) {
      loadTickets(page + 1, false, false, statusFilterRef.current, searchTextRef.current);
    }
  }, [loading, hasMore, page, refreshing, loadTickets]);

  const handleFilterChange = useCallback((filter: StatusFilter) => {
    setStatusFilter(filter);
    setPage(1);
    setHasMore(true);
  }, []);

  return {
    tickets,
    loading,
    searching,
    refreshing,
    searchText,
    setSearchText,
    statusFilter,
    error,
    isOffline,
    hasMore,
    handleRefresh,
    handleLoadMore,
    handleFilterChange,
  };
};

