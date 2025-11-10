import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import TicketCard from '../../src/components/_fragments/TicketCard';
import { Ticket } from '../../src/types/ticket.types';

jest.mock('../../src/utils/ticket.utils', () => ({
  formatDate: (date: string) => '01/01/2024',
  getPriorityLabel: (priority: string) => {
    const labels: Record<string, string> = {
      low: 'Baixa',
      medium: 'Média',
      high: 'Alta',
      critical: 'Crítica',
    };
    return labels[priority] || priority;
  },
}));

jest.mock('../../src/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        background: '#F5F7FA',
        surface: '#FFFFFF',
        text: '#2E3643',
        textSecondary: '#A7B3C4',
        textLight: '#E3E8EF',
        primary: '#2A4E6E',
        primaryLight: '#4D7A9A',
        border: '#E3E8EF',
        error: '#FF6F61',
        warning: '#FFCC80',
        success: '#4CAF50',
      },
    },
  }),
}));

const mockTicket: Ticket = {
  id: '1',
  title: 'Test Ticket',
  description: 'Test Description',
  category: 'Bug',
  priority: 'high',
  status: 'open',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  createdBy: {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
  },
};

describe('TicketCard', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar card corretamente', () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      tree = ReactTestRenderer.create(
        <TicketCard ticket={mockTicket} onPress={mockOnPress} />
      );
    });
    expect(tree!).toBeTruthy();
  });

  it('deve renderizar título do ticket', () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      tree = ReactTestRenderer.create(
        <TicketCard ticket={mockTicket} onPress={mockOnPress} />
      );
    });
    expect(tree!).toBeTruthy();
  });

  it('deve renderizar sem createdBy quando não fornecido', () => {
    const ticketWithoutAuthor = {
      ...mockTicket,
      createdBy: undefined,
    };

    let tree: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      tree = ReactTestRenderer.create(
        <TicketCard ticket={ticketWithoutAuthor} onPress={mockOnPress} />
      );
    });
    expect(tree!).toBeTruthy();
  });

  it('deve renderizar diferentes status', () => {
    const statuses: Ticket['status'][] = ['open', 'in_progress', 'resolved', 'closed'];
    
    statuses.forEach((status) => {
      const ticket = { ...mockTicket, status };
      let tree: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        tree = ReactTestRenderer.create(
          <TicketCard ticket={ticket} onPress={mockOnPress} />
        );
      });
      expect(tree!).toBeTruthy();
    });
  });

  it('deve renderizar diferentes prioridades', () => {
    const priorities: Ticket['priority'][] = ['low', 'medium', 'high', 'critical'];
    
    priorities.forEach((priority) => {
      const ticket = { ...mockTicket, priority };
      let tree: ReactTestRenderer.ReactTestRenderer;
      act(() => {
        tree = ReactTestRenderer.create(
          <TicketCard ticket={ticket} onPress={mockOnPress} />
        );
      });
      expect(tree!).toBeTruthy();
    });
  });
});

