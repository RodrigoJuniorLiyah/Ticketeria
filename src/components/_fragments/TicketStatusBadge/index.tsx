import React from 'react';

import { getStatusLabel } from '../../../utils/ticket.utils';
import { Badge, BadgeText } from './styles';

import { Ticket } from '../../../types/ticket.types';

interface TicketStatusBadgeProps {
  status: Ticket['status'];
}

const TicketStatusBadge = ({ status }: TicketStatusBadgeProps) => (
  <Badge status={status}>
    <BadgeText>{getStatusLabel(status)}</BadgeText>
  </Badge>
);

export default TicketStatusBadge;
