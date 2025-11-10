import React, { memo } from 'react';

import { TICKET_STATUS_FILTERS } from '../../constants/ticket.constants';
import {
  Header as HeaderContainer,
  HeaderRow,
  AddButton,
  AddButtonText,
  SearchInput,
  FilterContainer,
  FilterButton,
  FilterButtonText,
} from './styles';

import { theme } from '../../styles/theme';

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
  <FilterButton active={active} onPress={onPress}>
    <FilterButtonText active={active}>{filter.label}</FilterButtonText>
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
  return (
    <HeaderContainer>
      <HeaderRow>
        <SearchInput
          placeholder="Buscar por título ou número..."
          value={searchText}
          onChangeText={onSearchChange}
          placeholderTextColor={theme.colors.textSecondary}
        />
        <AddButton onPress={onCreateTicket}>
          <AddButtonText>+</AddButtonText>
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

