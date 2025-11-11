import { TicketApi, getNetworkMode, setNetworkMode } from '../../src/services/TicketApi';
import { Comment, Ticket, TicketListResponse } from '../../src/types/ticket.types';

jest.mock('../../src/services/TicketApi.mock', () => ({
  TicketApiMock: {
    list: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    addComment: jest.fn(),
    uploadAttachment: jest.fn(),
  },
}));

describe('TicketApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setNetworkMode(true);
  });

  describe('list', () => {
    it('deve listar tickets com sucesso', async () => {
      const mockResponse: TicketListResponse = {
        data: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      };

      const { TicketApiMock } = require('../../src/services/TicketApi.mock');
      TicketApiMock.list.mockResolvedValueOnce(mockResponse);

      const result = await TicketApi.list();

      expect(result).toEqual(mockResponse);
    });

    it('deve listar tickets com parâmetros', async () => {
      const mockResponse: TicketListResponse = {
        data: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      };

      const { TicketApiMock } = require('../../src/services/TicketApi.mock');
      TicketApiMock.list.mockResolvedValueOnce(mockResponse);

      const result = await TicketApi.list({
        page: 1,
        limit: 20,
        status: 'open',
        search: 'test',
      });

      expect(result).toEqual(mockResponse);
      expect(TicketApiMock.list).toHaveBeenCalledWith({
        page: 1,
        limit: 20,
        status: 'open',
        search: 'test',
      });
    });
  });

  describe('getById', () => {
    it('deve buscar ticket por ID com sucesso', async () => {
      const mockTicket: Ticket = {
        id: '1',
        title: 'Test Ticket',
        description: 'Test Description',
        category: 'Bug',
        priority: 'high',
        status: 'open',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      };

      const { TicketApiMock } = require('../../src/services/TicketApi.mock');
      TicketApiMock.getById.mockResolvedValueOnce(mockTicket);

      const result = await TicketApi.getById('1');

      expect(result).toEqual(mockTicket);
      expect(TicketApiMock.getById).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('deve criar ticket com sucesso', async () => {
      const ticketData: Partial<Ticket> = {
        title: 'New Ticket',
        description: 'New Description',
        category: 'Bug',
        priority: 'medium',
        status: 'open',
      };

      const mockCreatedTicket: Ticket = {
        id: '1',
        ...ticketData,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      } as Ticket;

      const { TicketApiMock } = require('../../src/services/TicketApi.mock');
      TicketApiMock.create.mockResolvedValueOnce(mockCreatedTicket);

      const result = await TicketApi.create(ticketData);

      expect(result).toEqual(mockCreatedTicket);
      expect(TicketApiMock.create).toHaveBeenCalledWith(ticketData);
    });
  });

  describe('update', () => {
    it('deve atualizar ticket com sucesso', async () => {
      const updateData: Partial<Ticket> = {
        status: 'resolved',
      };

      const mockUpdatedTicket: Ticket = {
        id: '1',
        title: 'Test Ticket',
        description: 'Test Description',
        category: 'Bug',
        priority: 'high',
        status: 'resolved',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-02',
      };

      const { TicketApiMock } = require('../../src/services/TicketApi.mock');
      TicketApiMock.update.mockResolvedValueOnce(mockUpdatedTicket);

      const result = await TicketApi.update('1', updateData);

      expect(result).toEqual(mockUpdatedTicket);
      expect(TicketApiMock.update).toHaveBeenCalledWith('1', updateData);
    });
  });

  describe('addComment', () => {
    it('deve adicionar comentário com sucesso', async () => {
      const mockComment: Comment = {
        id: '1',
        text: 'Test comment',
        createdAt: '2024-01-01',
        createdBy: {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
        },
      };

      const { TicketApiMock } = require('../../src/services/TicketApi.mock');
      TicketApiMock.addComment.mockResolvedValueOnce(mockComment);

      const result = await TicketApi.addComment('1', 'Test comment');

      expect(result).toEqual(mockComment);
      expect(TicketApiMock.addComment).toHaveBeenCalledWith('1', 'Test comment');
    });
  });

  describe('uploadAttachment', () => {
    it('deve fazer upload de anexo com sucesso', async () => {
      const mockAttachment = {
        id: '1',
        name: 'test.pdf',
        url: 'https://example.com/test.pdf',
        type: 'application/pdf',
        size: 1024,
      };

      const file = {
        uri: 'file://test.pdf',
        type: 'application/pdf',
        name: 'test.pdf',
      };

      const { TicketApiMock } = require('../../src/services/TicketApi.mock');
      TicketApiMock.uploadAttachment.mockResolvedValueOnce(mockAttachment);

      const result = await TicketApi.uploadAttachment('1', file);

      expect(result).toEqual(mockAttachment);
      expect(TicketApiMock.uploadAttachment).toHaveBeenCalledWith('1', file);
    });
  });

  describe('Network Mode', () => {
    it('deve definir modo de rede corretamente', () => {
      setNetworkMode(false);
      expect(getNetworkMode()).toBe(false);

      setNetworkMode(true);
      expect(getNetworkMode()).toBe(true);
    });
  });
});
