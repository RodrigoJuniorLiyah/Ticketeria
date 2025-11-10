import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import TicketCard from '../../components/_fragments/TicketCard';
import { useTicketList } from '../../hooks/useTicketList';
import Header from './Header';
import Body from './Body';
import {
  Container,
  LoadingContainer,
  LoadingText,
} from './styles';

import { Ticket } from '../../types/ticket.types';
import { theme } from '../../styles/theme';

const TicketList = () => {
  const navigation = useNavigation<any>();
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
  } = useTicketList();

  const handleTicketPress = useCallback(
    (ticket: Ticket) => {
      navigation.navigate('TicketDetails', { ticket });
    },
    [navigation]
  );

  const handleCreateTicket = useCallback(() => {
    navigation.navigate('CreateTicket');
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: Ticket }) => <TicketCard ticket={item} onPress={handleTicketPress} />,
    [handleTicketPress]
  );

  const keyExtractor = useCallback((item: Ticket) => String(item.id), []);

  const refreshControl = useMemo(
    () => <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />,
    [refreshing, handleRefresh]
  );

  const listFooterComponent = useMemo(
    () =>
      (loading || searching) && tickets.length > 0 ? (
        <LoadingContainer>
          <ActivityIndicator size="small" color={theme.colors.primary} />
        </LoadingContainer>
      ) : null,
    [loading, searching, tickets.length]
  );

  if (loading && tickets.length === 0) {
    return (
      <Container>
        <LoadingContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <LoadingText>Carregando tickets...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

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


