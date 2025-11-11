import { useCallback, useEffect, useRef, useState } from 'react';

import { fetchTickets } from '../pages/Ticketeria/fetchData';
import { ticketStorage } from '../helpers/ticketStorage';
import { Ticket, TicketListParams } from '../types/ticket.types';

type StatusFilter = 'all' | 'open' | 'in_progress' | 'resolved' | 'closed';

interface UseTicketListParams {
  initialStatusFilter?: StatusFilter;
  initialSearch?: string;
}

export const useTicketList = ({
  initialStatusFilter = 'all',
  initialSearch = '',
}: UseTicketListParams = {}) => {
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
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const loadPreferences = async () => {
      const preferences = await ticketStorage.getUserPreferences();
      if (preferences?.statusFilter) {
        setStatusFilter(preferences.statusFilter as StatusFilter);
      }
    };
    loadPreferences();
  }, []);

  const statusFilterRef = useRef(statusFilter);
  const searchTextRef = useRef(searchText);
  const isOfflineRef = useRef(isOffline);

  useEffect(() => {
    statusFilterRef.current = statusFilter;
  }, [statusFilter]);

  useEffect(() => {
    searchTextRef.current = searchText;
  }, [searchText]);

  useEffect(() => {
    isOfflineRef.current = isOffline;
  }, [isOffline]);

  const loadTickets = useCallback(
    async (
      pageNum = 1,
      reset = false,
      useCache = true,
      currentStatusFilter?: StatusFilter,
      currentSearchText?: string,
      isSearch = false,
      clearCache = false,
    ) => {
      try {
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

        const hasFilters = filter !== 'all' || search.trim();

        // Carrega do cache primeiro se não tiver filtros (melhor UX)
        if (reset && useCache && !hasFilters && pageNum === 1) {
          const cachedData = await ticketStorage.getTicketsList();
          if (cachedData && cachedData.data.length > 0) {
            setTickets(cachedData.data);
            setHasMore(cachedData.page < cachedData.totalPages);
            setPage(cachedData.page);
            setLoading(false);
            setSearching(false);
          }
        }

        if (reset) {
          if (isSearch) {
            setSearching(true);
          } else {
            setLoading(true);
          }
        }

        const response = await fetchTickets(params, false, clearCache);

        if (reset) {
          setTickets(response.data);
        } else {
          // Append para paginação
          setTickets(prev => [...prev, ...response.data]);
        }

        setHasMore(response.page < response.totalPages);
        setPage(response.page);

        const wasOffline = isOfflineRef.current;
        setIsOffline(false);

        // Se estava offline e voltou, recarrega os dados frescos
        if (wasOffline && reset && !hasFilters) {
          setTimeout(() => {
            loadTickets(
              1,
              true,
              false,
              currentStatusFilter ?? statusFilterRef.current,
              currentSearchText ?? searchTextRef.current,
              false,
              false,
            );
          }, 500);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar tickets';
        const isNetworkError = err instanceof Error && (err as any).isNetworkError;

        const cachedData = await ticketStorage.getTicketsList();
        if (cachedData && cachedData.data.length > 0) {
          const filter = currentStatusFilter ?? statusFilterRef.current;
          const search = currentSearchText ?? searchTextRef.current;
          const hasFilters = filter !== 'all' || search.trim();

          if (!hasFilters) {
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
    [],
  );

  useEffect(() => {
    if (isInitialLoad) {
      const useCache = statusFilter === 'all' && !searchText.trim();
      loadTickets(1, true, useCache, statusFilter, searchText, false);
      setIsInitialLoad(false);
    } else {
      setTickets([]);
      loadTickets(1, true, false, statusFilter, searchText, false);
    }
  }, [statusFilter, loadTickets, isInitialLoad, searchText]);

  useEffect(() => {
    if (isInitialLoad) {
      return;
    }

    const timeoutId = setTimeout(() => {
      loadTickets(1, true, false, statusFilterRef.current, searchText, true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchText, loadTickets, isInitialLoad]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadTickets(1, true, false, statusFilterRef.current, searchTextRef.current, false, true);
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
    ticketStorage.saveUserPreferences({ statusFilter: filter });
  }, []);

  const refreshList = useCallback(() => {
    const filter = statusFilterRef.current;
    const search = searchTextRef.current;
    const useCache = filter === 'all' && !search.trim();
    loadTickets(1, true, useCache, filter, search, false);
  }, [loadTickets]);

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
    refreshList,
  };
};
