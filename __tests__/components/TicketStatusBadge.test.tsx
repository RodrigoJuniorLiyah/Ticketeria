import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import TicketStatusBadge from '../../src/components/_fragments/TicketStatusBadge';

jest.mock('../../src/utils/ticket.utils', () => ({
  getStatusLabel: (status: string) => {
    const labels: Record<string, string> = {
      open: 'Aberto',
      in_progress: 'Em Andamento',
      resolved: 'Resolvido',
      closed: 'Fechado',
    };
    return labels[status] || status;
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

describe('TicketStatusBadge', () => {
  it('deve renderizar badge para status "open"', () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      tree = ReactTestRenderer.create(<TicketStatusBadge status="open" />);
    });
    expect(tree!).toBeTruthy();
  });

  it('deve renderizar badge para status "in_progress"', () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      tree = ReactTestRenderer.create(<TicketStatusBadge status="in_progress" />);
    });
    expect(tree!).toBeTruthy();
  });

  it('deve renderizar badge para status "resolved"', () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      tree = ReactTestRenderer.create(<TicketStatusBadge status="resolved" />);
    });
    expect(tree!).toBeTruthy();
  });

  it('deve renderizar badge para status "closed"', () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      tree = ReactTestRenderer.create(<TicketStatusBadge status="closed" />);
    });
    expect(tree!).toBeTruthy();
  });
});

