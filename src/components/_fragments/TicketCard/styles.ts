import styled from 'styled-components/native';

import { Ticket } from '../../../types/ticket.types';

export const Card = styled.TouchableOpacity`
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;

  padding: ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;

  background-color: ${({ theme }) => theme.colors.surface};

  box-shadow: ${({ theme }) => theme.shadows.medium};
  elevation: 3;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

export const CardTitle = styled.Text`
  flex: 1;

  margin-right: ${({ theme }) => theme.spacing.md}px;

  font-size: ${({ theme }) => theme.fontSize.lg}px;
  font-weight: 600;
  line-height: 24px;

  color: ${({ theme }) => theme.colors.text};
`;

export const CardBody = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const CardDescription = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  line-height: 22px;

  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const CardFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding-top: ${({ theme }) => theme.spacing.md}px;
  margin-top: ${({ theme }) => theme.spacing.xs}px;

  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
`;

export const CardMeta = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

export const CardMetaText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xs}px;

  margin-right: ${({ theme }) => theme.spacing.sm}px;

  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const CardCategory = styled.View`
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;

  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.sm}px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const CardCategoryText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  font-weight: 500;
  line-height: 16px;

  color: ${({ theme }) => theme.colors.primary};
`;

export const PriorityBadge = styled.View<{ priority: Ticket['priority'] }>`
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;

  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.sm}px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;

  background-color: ${({ priority }) => {
    const colors: Record<Ticket['priority'], string> = {
      low: 'rgba(76, 175, 80, 0.1)',
      medium: 'rgba(255, 204, 128, 0.2)',
      high: 'rgba(255, 111, 97, 0.1)',
      critical: 'rgba(255, 59, 48, 0.15)',
    };
    return colors[priority];
  }};
`;

export const PriorityBadgeText = styled.Text<{ priority: Ticket['priority'] }>`
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  font-weight: 600;
  line-height: 16px;

  color: ${({ priority, theme }) => {
    const colors: Record<Ticket['priority'], string> = {
      low: theme.colors.priority.low,
      medium: '#E65100',
      high: theme.colors.priority.high,
      critical: theme.colors.priority.critical,
    };
    return colors[priority];
  }};
`;

export const CardDate = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const CardDateText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  line-height: 16px;

  margin-left: ${({ theme }) => theme.spacing.xs}px;

  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Avatar = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;

  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.sm}px;

  background-color: ${({ theme }) => theme.colors.primary};
`;

export const AvatarText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  font-weight: 600;
  line-height: 16px;

  color: ${({ theme }) => theme.colors.surface};
`;

export const CardAuthor = styled.View`
  flex-direction: row;
  align-items: center;

  margin-top: ${({ theme }) => theme.spacing.md}px;
  padding-top: ${({ theme }) => theme.spacing.md}px;

  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
`;

export const CardAuthorText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  font-weight: 500;

  color: ${({ theme }) => theme.colors.textSecondary};
`;
