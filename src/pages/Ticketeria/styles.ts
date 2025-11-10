import styled from 'styled-components/native';

import { theme } from '../../styles/theme';
import { Ticket } from '../../types/ticket.types';

export const Container = styled.View`
  flex: 1;

  background-color: ${theme.colors.background};
`;

export const Content = styled.ScrollView`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: column;

  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};

  padding: ${theme.spacing.md}px;

  background-color: ${theme.colors.surface};
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: ${theme.spacing.sm}px;
`;

export const AddButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;

  background-color: ${theme.colors.primary};
`;

export const AddButtonText = styled.Text`
  font-size: ${theme.fontSize.xl}px;
  font-weight: 600;

  color: ${theme.colors.surface};
`;

export const SearchInput = styled.TextInput`
  flex: 1;

  border-radius: ${theme.borderRadius.md}px;

  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  margin-right: ${theme.spacing.sm}px;
  margin-bottom: ${theme.spacing.sm}px;

  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text};
  background-color: ${theme.colors.background};
`;

export const FilterContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;

  gap: ${theme.spacing.sm}px;
`;

export const FilterButton = styled.TouchableOpacity<{ active: boolean }>`
  border-radius: ${theme.borderRadius.md}px;
  border-width: 1px;
  border-color: ${({ active }) => (active ? theme.colors.primary : theme.colors.border)};

  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;

  background-color: ${({ active }) => (active ? theme.colors.primary : theme.colors.background)};
`;

export const FilterButtonText = styled.Text<{ active: boolean }>`
  font-size: ${theme.fontSize.sm}px;
  font-weight: ${({ active }) => (active ? '600' : '400')};

  color: ${({ active }) => (active ? theme.colors.surface : theme.colors.text)};
`;

export const Body = styled.View`
  flex: 1;

  padding: ${theme.spacing.md}px;
`;

export const ListContainer = styled.View`
  flex: 1;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding: ${theme.spacing.xl}px;
`;

export const EmptyText = styled.Text`
  font-size: ${theme.fontSize.md}px;
  text-align: center;

  color: ${theme.colors.textSecondary};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding: ${theme.spacing.xl}px;
`;

export const LoadingText = styled.Text`
  font-size: ${theme.fontSize.md}px;

  margin-top: ${theme.spacing.md}px;

  color: ${theme.colors.textSecondary};
`;

export const OfflineBanner = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.sm}px;

  background-color: ${theme.colors.warning};
  border-radius: ${theme.borderRadius.md}px;
`;

export const OfflineBannerText = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  font-weight: 500;

  color: ${theme.colors.surface};
`;

