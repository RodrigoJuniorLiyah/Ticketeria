import React, { memo, useCallback } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TicketStatusBadge from '../TicketStatusBadge';
import { formatDate, getPriorityLabel } from '../../../utils/ticket.utils';
import {
  Avatar,
  AvatarText,
  Card,
  CardAuthor,
  CardAuthorText,
  CardBody,
  CardCategory,
  CardCategoryText,
  CardDate,
  CardDateText,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMeta,
  CardTitle,
  PriorityBadge,
  PriorityBadgeText,
} from './styles';

import { Ticket } from '../../../types/ticket.types';
import { useTheme } from '../../../contexts/ThemeContext';

interface TicketCardProps {
  ticket: Ticket;
  onPress: (ticket: Ticket) => void;
}

const getInitials = (name?: string): string => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const TicketCard = memo(
  ({ ticket, onPress }: TicketCardProps) => {
    const { theme } = useTheme();
    const handlePress = useCallback(() => {
      onPress(ticket);
    }, [ticket, onPress]);

    return (
      <Card onPress={handlePress} activeOpacity={0.8}>
        <CardHeader>
          <CardTitle numberOfLines={2}>{ticket.title}</CardTitle>
          <TicketStatusBadge status={ticket.status} />
        </CardHeader>

        <CardBody>
          <CardDescription numberOfLines={2}>{ticket.description}</CardDescription>
        </CardBody>

        <CardFooter>
          <CardMeta>
            <CardCategory>
              <CardCategoryText>{ticket.category}</CardCategoryText>
            </CardCategory>
            <PriorityBadge priority={ticket.priority}>
              <PriorityBadgeText priority={ticket.priority}>
                {getPriorityLabel(ticket.priority)}
              </PriorityBadgeText>
            </PriorityBadge>
          </CardMeta>
          <CardDate>
            <Ionicons name="calendar-outline" size={14} color={theme.colors.textSecondary} />
            <CardDateText>{formatDate(ticket.createdAt)}</CardDateText>
          </CardDate>
        </CardFooter>

        {ticket.createdBy && (
          <CardAuthor>
            <Avatar>
              <AvatarText>{getInitials(ticket.createdBy.name)}</AvatarText>
            </Avatar>
            <CardAuthorText>{ticket.createdBy.name}</CardAuthorText>
          </CardAuthor>
        )}
      </Card>
    );
  },
  (prevProps, nextProps) =>
    prevProps.ticket.id === nextProps.ticket.id &&
    prevProps.ticket.title === nextProps.ticket.title &&
    prevProps.ticket.description === nextProps.ticket.description &&
    prevProps.ticket.status === nextProps.ticket.status &&
    prevProps.ticket.priority === nextProps.ticket.priority &&
    prevProps.ticket.category === nextProps.ticket.category &&
    prevProps.ticket.createdAt === nextProps.ticket.createdAt &&
    prevProps.onPress === nextProps.onPress,
);

TicketCard.displayName = 'TicketCard';

export default TicketCard;
