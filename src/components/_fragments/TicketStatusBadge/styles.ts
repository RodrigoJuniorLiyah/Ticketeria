import styled from 'styled-components/native';

import { Theme } from '../../../styles/theme';

interface BadgeProps {
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
}

const getStatusBackground = (status: BadgeProps['status'], theme: Theme): string => {
  const isDark = theme.colors.background === '#121212';

  if (isDark) {
    const backgrounds: Record<BadgeProps['status'], string> = {
      open: 'rgba(77, 122, 154, 0.3)',
      in_progress: 'rgba(255, 183, 77, 0.3)',
      resolved: 'rgba(102, 187, 106, 0.3)',
      closed: 'rgba(117, 117, 117, 0.3)',
    };
    return backgrounds[status];
  }

  const backgrounds: Record<BadgeProps['status'], string> = {
    open: 'rgba(42, 78, 110, 0.1)',
    in_progress: 'rgba(255, 204, 128, 0.2)',
    resolved: 'rgba(76, 175, 80, 0.1)',
    closed: 'rgba(167, 179, 196, 0.1)',
  };
  return backgrounds[status];
};

const getStatusTextColor = (status: BadgeProps['status'], theme: Theme): string =>
  theme.colors.status[status];

export const Badge = styled.View<BadgeProps>`
  align-self: flex-start;

  border-radius: ${({ theme }) => theme.borderRadius.md}px;

  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.sm}px;

  background-color: ${({ status, theme }) => getStatusBackground(status, theme)};
`;

export const BadgeText = styled.Text<BadgeProps>`
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  font-weight: 600;

  color: ${({ status, theme }) => getStatusTextColor(status, theme)};
`;
