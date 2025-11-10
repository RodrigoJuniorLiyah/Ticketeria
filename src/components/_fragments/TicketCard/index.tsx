import React, { memo, useCallback } from 'react';

import TicketStatusBadge from '../TicketStatusBadge';
import { formatDate, getPriorityLabel } from '../../../utils/ticket.utils';
import { Card, CardHeader, CardTitle, CardBody, CardDescription, CardFooter, CardMeta, CardMetaText, CardCategory } from './styles';

import { Ticket } from '../../../types/ticket.types';

interface TicketCardProps {
  ticket: Ticket;
  onPress: (ticket: Ticket) => void;
}

const TicketCard = memo(({ ticket, onPress }: TicketCardProps) => {
  const handlePress = useCallback(() => {
    onPress(ticket);
  }, [ticket, onPress]);

  return (
    <Card onPress={handlePress} activeOpacity={0.7}>
      <CardHeader>
        <CardTitle numberOfLines={2}>{ticket.title}</CardTitle>
        <TicketStatusBadge status={ticket.status} />
      </CardHeader>
      
      <CardBody>
        <CardDescription numberOfLines={2}>{ticket.description}</CardDescription>
      </CardBody>
      
      <CardFooter>
        <CardMeta>
          <CardCategory>{ticket.category}</CardCategory>
          <CardMetaText>•</CardMetaText>
          <CardMetaText>{getPriorityLabel(ticket.priority)}</CardMetaText>
        </CardMeta>
        <CardMetaText>{formatDate(ticket.createdAt)}</CardMetaText>
      </CardFooter>
    </Card>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.ticket.id === nextProps.ticket.id &&
    prevProps.ticket.title === nextProps.ticket.title &&
    prevProps.ticket.description === nextProps.ticket.description &&
    prevProps.ticket.status === nextProps.ticket.status &&
    prevProps.ticket.priority === nextProps.ticket.priority &&
    prevProps.ticket.category === nextProps.ticket.category &&
    prevProps.ticket.createdAt === nextProps.ticket.createdAt &&
    prevProps.onPress === nextProps.onPress
  );
});

TicketCard.displayName = 'TicketCard';

export default TicketCard;


