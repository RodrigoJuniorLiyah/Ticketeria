import styled from 'styled-components/native';

import { theme } from '../../../styles/theme';

interface BadgeProps {
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
}

export const Badge = styled.View<BadgeProps>`
  align-self: flex-start;

  border-radius: ${theme.borderRadius.sm}px;

  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;

  background-color: ${({ status }) => theme.colors.status[status]};
`;

export const BadgeText = styled.Text`
  font-size: ${theme.fontSize.xs}px;
  font-weight: 600;
  text-transform: uppercase;

  color: ${theme.colors.surface};
`;

