import React, { memo } from 'react';
import { FlatList, RefreshControlProps } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TicketCardSkeleton from '../../components/_fragments/TicketCardSkeleton';
import {
  Body as BodyContainer,
  ListContainer,
  EmptyContainer,
  EmptyIcon,
  EmptyText,
  EmptySubtext,
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
  refreshControl: React.ReactElement<RefreshControlProps>;
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
      {(loading || searching) && tickets.length === 0 ? (
        <ListContainer>
          {[1, 2, 3, 4, 5].map((index) => (
            <TicketCardSkeleton key={index} />
          ))}
        </ListContainer>
      ) : tickets.length === 0 && !loading && !searching ? (
        <EmptyContainer>
          <EmptyIcon>
            <Ionicons name="ticket-outline" size={40} color={theme.colors.textSecondary} />
          </EmptyIcon>
          <EmptyText>
            {error
              ? 'Ops! Algo deu errado'
              : searchText || statusFilter !== 'all'
                ? 'Nenhum ticket encontrado'
                : 'Nenhum ticket cadastrado'}
          </EmptyText>
          <EmptySubtext>
            {error
              ? error
              : searchText || statusFilter !== 'all'
                ? 'Tente ajustar os filtros ou busca'
                : 'Comece criando seu primeiro ticket'}
          </EmptySubtext>
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
            showsVerticalScrollIndicator={false}
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

