import React, { useCallback, useMemo, useRef } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import TicketCard from '../../components/_fragments/TicketCard';
import { useTicketList } from '../../hooks/useTicketList';
import { ticketStorage } from '../../helpers/ticketStorage';
import Header from './Header';
import Body from './Body';
import { Container, LoadingContainer } from './styles';

import { Ticket } from '../../types/ticket.types';
import { useTheme } from '../../contexts/ThemeContext';

const TicketList = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const isFirstFocus = useRef(true);
  const {
    tickets,
    loading,
    searching,
    refreshing,
    searchText,
    setSearchText,
    statusFilter,
    error,
    isOffline,
    handleRefresh,
    handleLoadMore,
    handleFilterChange,
    refreshList,
  } = useTicketList();

  const handleTicketPress = useCallback(
    async (ticket: Ticket) => {
      await ticketStorage.saveTicketDetails(ticket.id, ticket);
      navigation.navigate('TicketDetails', { ticket });
    },
    [navigation],
  );

  const handleCreateTicket = useCallback(() => {
    navigation.navigate('CreateTicket');
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: Ticket }) => <TicketCard ticket={item} onPress={handleTicketPress} />,
    [handleTicketPress],
  );

  const keyExtractor = useCallback((item: Ticket) => String(item.id), []);

  const refreshControl = useMemo(
    () => <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />,
    [refreshing, handleRefresh],
  );

  const listFooterComponent = useMemo(
    () =>
      (loading || searching) && tickets.length > 0 ? (
        <LoadingContainer>
          <ActivityIndicator size="small" color={theme.colors.primary} />
        </LoadingContainer>
      ) : null,
    [loading, searching, tickets.length, theme.colors.primary],
  );

  // Evita reload desnecessário na primeira vez que a tela é focada
  useFocusEffect(
    useCallback(() => {
      if (isFirstFocus.current) {
        isFirstFocus.current = false;
        return;
      }

      // Pequeno delay para evitar múltiplos reloads rápidos
      const timer = setTimeout(() => {
        refreshList();
      }, 100);
      return () => clearTimeout(timer);
    }, [refreshList]),
  );

  return (
    <Container>
      <Header
        searchText={searchText}
        onSearchChange={setSearchText}
        statusFilter={statusFilter}
        onFilterChange={handleFilterChange}
        onCreateTicket={handleCreateTicket}
      />

      <Body
        tickets={tickets}
        loading={loading}
        searching={searching}
        error={error}
        isOffline={isOffline}
        searchText={searchText}
        statusFilter={statusFilter}
        refreshing={refreshing}
        refreshControl={refreshControl}
        listFooterComponent={listFooterComponent}
        onTicketPress={handleTicketPress}
        onLoadMore={handleLoadMore}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </Container>
  );
};

export default TicketList;
