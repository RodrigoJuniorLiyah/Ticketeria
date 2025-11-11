import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ticket, TicketListResponse } from '../types/ticket.types';

const STORAGE_KEYS = {
  TICKETS_LIST: '@ticketeria:tickets_list',
  TICKET_DETAILS: '@ticketeria:ticket_details',
  FILTERS: '@ticketeria:filters',
  USER_PREFERENCES: '@ticketeria:user_preferences',
};

export const ticketStorage = {
  saveTicketsList: async (data: TicketListResponse): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TICKETS_LIST, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving tickets list:', error);
    }
  },

  getTicketsList: async (): Promise<TicketListResponse | null> => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.TICKETS_LIST);
      if (data) {
        return JSON.parse(data) as TicketListResponse;
      }
      return null;
    } catch (error) {
      console.error('Error getting tickets list:', error);
      return null;
    }
  },

  saveTicketDetails: async (ticketId: string | number, ticket: Ticket): Promise<void> => {
    try {
      await AsyncStorage.setItem(
        `${STORAGE_KEYS.TICKET_DETAILS}:${ticketId}`,
        JSON.stringify(ticket),
      );
    } catch (error) {
      console.error('Error saving ticket details:', error);
    }
  },

  getTicketDetails: async (ticketId: string | number): Promise<Ticket | null> => {
    try {
      const data = await AsyncStorage.getItem(`${STORAGE_KEYS.TICKET_DETAILS}:${ticketId}`);
      if (data) {
        return JSON.parse(data) as Ticket;
      }
      return null;
    } catch (error) {
      console.error('Error getting ticket details:', error);
      return null;
    }
  },

  saveFilters: async (filters: Record<string, unknown>): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(filters));
    } catch (error) {
      console.error('Error saving filters:', error);
    }
  },

  getFilters: async (): Promise<Record<string, unknown> | null> => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.FILTERS);
      if (data) {
        return JSON.parse(data) as Record<string, unknown>;
      }
      return null;
    } catch (error) {
      console.error('Error getting filters:', error);
      return null;
    }
  },

  clearTicketsList: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.TICKETS_LIST);
    } catch (error) {
      console.error('Error clearing tickets list:', error);
    }
  },

  saveUserPreferences: async (preferences: {
    statusFilter?: string;
    sort?: string;
  }): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving user preferences:', error);
    }
  },

  getUserPreferences: async (): Promise<{
    statusFilter?: string;
    sort?: string;
  } | null> => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      if (data) {
        return JSON.parse(data) as { statusFilter?: string; sort?: string };
      }
      return null;
    } catch (error) {
      console.error('Error getting user preferences:', error);
      return null;
    }
  },
};
