import {
  Ticket,
  TicketListParams,
  TicketListResponse,
  Comment,
  Attachment,
} from '../types/ticket.types';

const MOCK_TICKETS: Ticket[] = [
  {
    id: 1,
    title: 'Erro ao fazer login no sistema',
    description: 'Ao tentar fazer login, recebo uma mensagem de erro mesmo com credenciais corretas. O problema começou hoje pela manhã.',
    category: 'Bug',
    priority: 'high',
    status: 'open',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    createdBy: {
      id: '1',
      name: 'João Silva',
      email: 'joao@example.com',
    },
    comments: [],
    attachments: [
      {
        id: 1,
        name: 'screenshot_erro.png',
        url: 'https://example.com/attachments/screenshot_erro.png',
        type: 'image/png',
        size: 245760,
      },
      {
        id: 2,
        name: 'log_erro.txt',
        url: 'https://example.com/attachments/log_erro.txt',
        type: 'text/plain',
        size: 15360,
      },
    ],
  },
  {
    id: 2,
    title: 'Solicitação de nova funcionalidade',
    description: 'Gostaria de solicitar a implementação de um filtro avançado na tela de relatórios para facilitar a análise de dados.',
    category: 'Melhoria',
    priority: 'medium',
    status: 'in_progress',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    createdBy: {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@example.com',
    },
    comments: [
      {
        id: 1,
        text: 'Vamos analisar a viabilidade desta funcionalidade.',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        createdBy: {
          id: '3',
          name: 'Suporte Técnico',
          email: 'suporte@example.com',
        },
      },
    ],
    attachments: [
      {
        id: 3,
        name: 'proposta_funcionalidade.pdf',
        url: 'https://example.com/attachments/proposta_funcionalidade.pdf',
        type: 'application/pdf',
        size: 512000,
      },
    ],
  },
  {
    id: 3,
    title: 'Dúvida sobre configuração',
    description: 'Preciso de ajuda para configurar as permissões de acesso do novo usuário. Não encontrei a opção no menu.',
    category: 'Dúvida',
    priority: 'low',
    status: 'resolved',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    createdBy: {
      id: '4',
      name: 'Pedro Oliveira',
      email: 'pedro@example.com',
    },
    comments: [
      {
        id: 2,
        text: 'A configuração está disponível em Configurações > Usuários > Permissões.',
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        createdBy: {
          id: '3',
          name: 'Suporte Técnico',
          email: 'suporte@example.com',
        },
      },
    ],
    attachments: [],
  },
  {
    id: 4,
    title: 'Problema crítico no servidor',
    description: 'O servidor de produção está apresentando lentidão extrema. Todos os usuários estão sendo afetados.',
    category: 'Bug',
    priority: 'critical',
    status: 'open',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    createdBy: {
      id: '5',
      name: 'Ana Costa',
      email: 'ana@example.com',
    },
    comments: [],
    attachments: [],
  },
  {
    id: 5,
    title: 'Solicitação de treinamento',
    description: 'Gostaria de solicitar um treinamento sobre as novas funcionalidades do sistema para minha equipe.',
    category: 'Outro',
    priority: 'low',
    status: 'closed',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    createdBy: {
      id: '6',
      name: 'Carlos Mendes',
      email: 'carlos@example.com',
    },
    comments: [],
    attachments: [],
  },
];

let nextId = 6;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const filterTickets = (tickets: Ticket[], params?: TicketListParams): Ticket[] => {
  let filtered = [...tickets];

  if (params?.status && params.status !== 'all') {
    filtered = filtered.filter((ticket) => ticket.status === params.status);
  }

  if (params?.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(searchLower) ||
        ticket.description.toLowerCase().includes(searchLower) ||
        String(ticket.id).includes(searchLower)
    );
  }

  return filtered;
};

const sortTickets = (tickets: Ticket[], sort?: string): Ticket[] => {
  const sorted = [...tickets];

  if (sort === 'createdAt_desc') {
    sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sort === 'createdAt_asc') {
    sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  return sorted;
};

export const TicketApiMock = {
  list: async (params?: TicketListParams): Promise<TicketListResponse> => {
    await delay(500);

    let tickets = [...MOCK_TICKETS];

    tickets = filterTickets(tickets, params);
    tickets = sortTickets(tickets, params?.sort);

    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const total = tickets.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTickets = tickets.slice(startIndex, endIndex);

    return {
      data: paginatedTickets,
      total,
      page,
      limit,
      totalPages,
    };
  },

  getById: async (id: string | number): Promise<Ticket> => {
    await delay(300);

    const ticket = MOCK_TICKETS.find((t) => String(t.id) === String(id));

    if (!ticket) {
      throw new Error(`Ticket com ID ${id} não encontrado`);
    }

    return { ...ticket };
  },

  create: async (ticketData: Partial<Ticket>): Promise<Ticket> => {
    await delay(800);

    const newTicket: Ticket = {
      id: nextId++,
      title: ticketData.title || '',
      description: ticketData.description || '',
      category: ticketData.category || '',
      priority: ticketData.priority || 'medium',
      status: ticketData.status || 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: {
        id: 'current-user',
        name: 'Usuário Atual',
        email: 'usuario@example.com',
      },
      comments: [],
      attachments: [],
    };

    MOCK_TICKETS.unshift(newTicket);

    return newTicket;
  },

  update: async (id: string | number, ticketData: Partial<Ticket>): Promise<Ticket> => {
    await delay(500);

    const index = MOCK_TICKETS.findIndex((t) => String(t.id) === String(id));

    if (index === -1) {
      throw new Error(`Ticket com ID ${id} não encontrado`);
    }

    const updatedTicket: Ticket = {
      ...MOCK_TICKETS[index],
      ...ticketData,
      id: MOCK_TICKETS[index].id,
      updatedAt: new Date().toISOString(),
    };

    MOCK_TICKETS[index] = updatedTicket;

    return updatedTicket;
  },

  addComment: async (id: string | number, text: string): Promise<Comment> => {
    await delay(400);

    const ticket = MOCK_TICKETS.find((t) => String(t.id) === String(id));

    if (!ticket) {
      throw new Error(`Ticket com ID ${id} não encontrado`);
    }

    const newComment: Comment = {
      id: Date.now(),
      text,
      createdAt: new Date().toISOString(),
      createdBy: {
        id: 'current-user',
        name: 'Usuário Atual',
        email: 'usuario@example.com',
      },
    };

    if (!ticket.comments) {
      ticket.comments = [];
    }

    ticket.comments.push(newComment);
    ticket.updatedAt = new Date().toISOString();

    return newComment;
  },

  uploadAttachment: async (id: string | number, file: unknown): Promise<unknown> => {
    await delay(1000);

    const ticket = MOCK_TICKETS.find((t) => String(t.id) === String(id));

    if (!ticket) {
      throw new Error(`Ticket com ID ${id} não encontrado`);
    }

    const fileData = file as { name?: string; type?: string; size?: number; uri?: string };
    
    const attachment = {
      id: Date.now(),
      name: fileData.name || 'arquivo_anexo.pdf',
      url: fileData.uri || 'https://example.com/attachments/file.pdf',
      type: fileData.type || 'application/pdf',
      size: fileData.size || 1024000,
    };

    if (!ticket.attachments) {
      ticket.attachments = [];
    }

    ticket.attachments.push(attachment);
    ticket.updatedAt = new Date().toISOString();

    return attachment;
  },
};

