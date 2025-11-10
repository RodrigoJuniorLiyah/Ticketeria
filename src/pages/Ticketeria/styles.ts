import styled from 'styled-components/native';

import { Ticket } from '../../types/ticket.types';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.ScrollView`
  flex: 1;
`;

export const Header = styled.View`
  padding-top: ${({ theme }) => theme.spacing.md}px;
  padding-bottom: ${({ theme }) => theme.spacing.md}px;
  padding-left: ${({ theme }) => theme.spacing.md}px;
  padding-right: ${({ theme }) => theme.spacing.md}px;

  background-color: ${({ theme }) => theme.colors.surface};

  box-shadow: ${({ theme }) => theme.shadows.small};
  elevation: 2;
`;

export const HeaderTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xxl}px;
  font-weight: 600;

  margin-bottom: ${({ theme }) => theme.spacing.md}px;

  color: ${({ theme }) => theme.colors.text};
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

export const SearchContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;

  border-radius: ${({ theme }) => theme.borderRadius.lg}px;

  padding-left: ${({ theme }) => theme.spacing.md}px;
  padding-right: ${({ theme }) => theme.spacing.md}px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const SearchInput = styled.TextInput`
  flex: 1;

  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.sm}px;

  font-size: ${({ theme }) => theme.fontSize.md}px;

  color: ${({ theme }) => theme.colors.text};
`;

export const AddButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.primary};

  box-shadow: ${({ theme }) => theme.shadows.small};
  elevation: 2;
`;

export const AddButtonText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xl}px;
  font-weight: 600;

  color: ${({ theme }) => theme.colors.surface};
`;

export const FilterContainer = styled.ScrollView.attrs(({ theme }) => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingRight: theme.spacing.md,
  },
}))`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

export const FilterButton = styled.TouchableOpacity<{ active: boolean; filterValue?: string }>`
  border-radius: ${({ theme }) => theme.borderRadius.xl}px;

  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;

  background-color: ${({ active, theme, filterValue }) => {
    if (!active) {
      return theme.colors.background;
    }

    const isDark = theme.colors.background === '#121212';
    
    if (filterValue === 'all') {
      return theme.colors.primary;
    }

    if (isDark) {
      const darkColors: Record<string, string> = {
        open: 'rgba(77, 122, 154, 0.3)',
        in_progress: 'rgba(255, 183, 77, 0.3)',
        resolved: 'rgba(102, 187, 106, 0.3)',
        closed: 'rgba(117, 117, 117, 0.3)',
      };
      return darkColors[filterValue || ''] || theme.colors.primary;
    }

    const lightColors: Record<string, string> = {
      open: 'rgba(42, 78, 110, 0.15)',
      in_progress: 'rgba(255, 204, 128, 0.25)',
      resolved: 'rgba(76, 175, 80, 0.15)',
      closed: 'rgba(167, 179, 196, 0.15)',
    };
    return lightColors[filterValue || ''] || theme.colors.primary;
  }};
`;

export const FilterButtonText = styled.Text<{ active: boolean; filterValue?: string }>`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: ${({ active }) => (active ? '600' : '500')};

  color: ${({ active, theme, filterValue }) => {
    if (!active) {
      return theme.colors.text;
    }

    if (filterValue === 'all') {
      return theme.colors.surface;
    }

    return theme.colors.status[filterValue as keyof typeof theme.colors.status] || theme.colors.surface;
  }};
`;

export const Body = styled.View`
  flex: 1;

  padding: ${({ theme }) => theme.spacing.md}px;
`;

export const ListContainer = styled.View`
  flex: 1;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding: ${({ theme }) => theme.spacing.xxl}px ${({ theme }) => theme.spacing.xl}px;
`;

export const EmptyIcon = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;

  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const EmptyText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  font-weight: 500;
  text-align: center;

  margin-bottom: ${({ theme }) => theme.spacing.xs}px;

  color: ${({ theme }) => theme.colors.text};
`;

export const EmptySubtext = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  text-align: center;

  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding: ${({ theme }) => theme.spacing.xl}px;
`;

export const LoadingText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md}px;

  margin-top: ${({ theme }) => theme.spacing.md}px;

  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const OfflineBanner = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;

  background-color: ${({ theme }) => theme.colors.warning};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
`;

export const OfflineBannerText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: 500;

  color: ${({ theme }) => theme.colors.surface};
`;

