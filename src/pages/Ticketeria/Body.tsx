import React, { memo } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import TicketCard from '../../components/_fragments/TicketCard';
import {
  Body as BodyContainer,
  ListContainer,
  EmptyContainer,
  EmptyText,
  LoadingContainer,
  LoadingText,
  OfflineBanner,
  OfflineBannerText,
} from './styles';

import { Ticket } from '../../types/ticket.types';
import { theme } from '../../styles/theme';

interface BodyProps {
  tickets: Ticket[];
  loading: boolean;
  searching: boolean;
  error: string | null;
  isOffline: boolean;
  searchText: string;
  statusFilter: string;
  refreshing: boolean;
  refreshControl: React.ReactElement;
  listFooterComponent: React.ReactElement | null;
  onTicketPress: (ticket: Ticket) => void;
  onLoadMore: () => void;
  renderItem: (props: { item: Ticket }) => React.ReactElement;
  keyExtractor: (item: Ticket) => string;
}

const areTicketsEqual = (prev: Ticket[], next: Ticket[]): boolean => {
  if (prev.length !== next.length) return false;
  return prev.every((ticket, index) => {
    const nextTicket = next[index];
    return (
      ticket.id === nextTicket?.id &&
      ticket.title === nextTicket?.title &&
      ticket.status === nextTicket?.status &&
      ticket.description === nextTicket?.description
    );
  });
};

const Body = memo(({
  tickets,
  loading,
  searching,
  error,
  isOffline,
  searchText,
  statusFilter,
  refreshControl,
  listFooterComponent,
  onTicketPress,
  onLoadMore,
  renderItem,
  keyExtractor,
}: BodyProps) => {
  return (
    <BodyContainer>
      {isOffline && tickets.length > 0 && (
        <OfflineBanner>
          <OfflineBannerText>
            ⚠️ Modo offline - Exibindo dados salvos
          </OfflineBannerText>
        </OfflineBanner>
      )}
      {tickets.length === 0 && !loading && !searching ? (
        <EmptyContainer>
          <EmptyText>
            {error
              ? error
              : searchText || statusFilter !== 'all'
                ? 'Nenhum ticket encontrado'
                : 'Nenhum ticket cadastrado'}
          </EmptyText>
        </EmptyContainer>
      ) : (
        <ListContainer>
          <FlatList<Ticket>
            data={tickets}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            refreshControl={refreshControl}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={listFooterComponent}
            removeClippedSubviews
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={50}
            initialNumToRender={10}
            windowSize={10}
          />
        </ListContainer>
      )}
    </BodyContainer>
  );
}, (prevProps, nextProps) => {
  return (
    areTicketsEqual(prevProps.tickets, nextProps.tickets) &&
    prevProps.loading === nextProps.loading &&
    prevProps.searching === nextProps.searching &&
    prevProps.error === nextProps.error &&
    prevProps.isOffline === nextProps.isOffline &&
    prevProps.searchText === nextProps.searchText &&
    prevProps.statusFilter === nextProps.statusFilter &&
    prevProps.refreshing === nextProps.refreshing
  );
});

Body.displayName = 'TicketListBody';

export default Body;

