import React, { memo } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { TICKET_STATUS_FILTERS } from '../../constants/ticket.constants';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Header as HeaderContainer,
  HeaderTitle,
  HeaderRow,
  AddButton,
  SearchContainer,
  SearchInput,
  FilterContainer,
  FilterButton,
  FilterButtonText,
} from './styles';

type StatusFilter = 'all' | 'open' | 'in_progress' | 'resolved' | 'closed';

interface HeaderProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  statusFilter: StatusFilter;
  onFilterChange: (filter: StatusFilter) => void;
  onCreateTicket: () => void;
}

const FilterButtonItem = memo<{
  filter: { label: string; value: StatusFilter };
  active: boolean;
  onPress: () => void;
}>(({ filter, active, onPress }) => (
  <FilterButton active={active} filterValue={filter.value} onPress={onPress}>
    <FilterButtonText active={active} filterValue={filter.value}>
      {filter.label}
    </FilterButtonText>
  </FilterButton>
));

FilterButtonItem.displayName = 'FilterButtonItem';

const Header = memo(({
  searchText,
  onSearchChange,
  statusFilter,
  onFilterChange,
  onCreateTicket,
}: HeaderProps) => {
  const { theme } = useTheme();

  return (
    <HeaderContainer>
      <HeaderTitle>Tickets</HeaderTitle>
      <HeaderRow>
        <SearchContainer>
          <Ionicons name="search-outline" size={20} color={theme.colors.textSecondary} />
          <SearchInput
            placeholder="Buscar tickets..."
            value={searchText}
            onChangeText={onSearchChange}
            placeholderTextColor={theme.colors.textSecondary}
          />
        </SearchContainer>
        <AddButton onPress={onCreateTicket}>
          <Ionicons name="add" size={24} color={theme.colors.surface} />
        </AddButton>
      </HeaderRow>
      <FilterContainer>
        {TICKET_STATUS_FILTERS.map((filter) => (
          <FilterButtonItem
            key={filter.value}
            filter={filter}
            active={statusFilter === filter.value}
            onPress={() => onFilterChange(filter.value)}
          />
        ))}
      </FilterContainer>
    </HeaderContainer>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.searchText === nextProps.searchText &&
    prevProps.statusFilter === nextProps.statusFilter
  );
});

Header.displayName = 'TicketListHeader';

export default Header;

