import AsyncStorage from '@react-native-async-storage/async-storage';

import { Attachment } from '../types/ticket.types';

const STORAGE_KEYS = {
  ATTACHMENTS_METADATA: '@ticketeria:attachments_metadata',
  PENDING_ATTACHMENTS: '@ticketeria:pending_attachments',
};

interface AttachmentMetadata {
  ticketId: string | number;
  attachmentId: string | number;
  name: string;
  type: string;
  size: number;
  url?: string;
  localUri?: string;
  uploaded: boolean;
  createdAt: string;
}

interface PendingAttachment {
  ticketId: string | number;
  uri: string;
  name: string;
  type: string;
  size: number;
  createdAt: string;
}

export const attachmentStorage = {
  saveAttachmentMetadata: async (
    ticketId: string | number,
    attachment: Attachment,
    localUri?: string,
  ): Promise<void> => {
    try {
      const metadata: AttachmentMetadata = {
        ticketId,
        attachmentId: attachment.id,
        name: attachment.name,
        type: attachment.type,
        size: attachment.size,
        url: attachment.url,
        localUri,
        uploaded: !!attachment.url,
        createdAt: new Date().toISOString(),
      };

      const key = `${STORAGE_KEYS.ATTACHMENTS_METADATA}:${ticketId}:${attachment.id}`;
      await AsyncStorage.setItem(key, JSON.stringify(metadata));
    } catch (error) {
      console.error('Error saving attachment metadata:', error);
    }
  },

  getAttachmentMetadata: async (
    ticketId: string | number,
    attachmentId: string | number,
  ): Promise<AttachmentMetadata | null> => {
    try {
      const key = `${STORAGE_KEYS.ATTACHMENTS_METADATA}:${ticketId}:${attachmentId}`;
      const data = await AsyncStorage.getItem(key);
      if (data) {
        return JSON.parse(data) as AttachmentMetadata;
      }
      return null;
    } catch (error) {
      console.error('Error getting attachment metadata:', error);
      return null;
    }
  },

  getAllAttachmentsMetadata: async (ticketId: string | number): Promise<AttachmentMetadata[]> => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const ticketPrefix = `${STORAGE_KEYS.ATTACHMENTS_METADATA}:${ticketId}:`;
      const ticketKeys = keys.filter(key => key.startsWith(ticketPrefix));

      if (ticketKeys.length === 0) {
        return [];
      }

      const items = await AsyncStorage.multiGet(ticketKeys);
      return items
        .map(([, value]) => {
          if (value) {
            try {
              return JSON.parse(value) as AttachmentMetadata;
            } catch {
              return null;
            }
          }
          return null;
        })
        .filter((item): item is AttachmentMetadata => item !== null);
    } catch (error) {
      console.error('Error getting all attachments metadata:', error);
      return [];
    }
  },

  savePendingAttachment: async (
    ticketId: string | number,
    attachment: PendingAttachment,
  ): Promise<void> => {
    try {
      const pending = await attachmentStorage.getPendingAttachments(ticketId);
      const updated = [...pending, attachment];
      const key = `${STORAGE_KEYS.PENDING_ATTACHMENTS}:${ticketId}`;
      await AsyncStorage.setItem(key, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving pending attachment:', error);
    }
  },

  getPendingAttachments: async (ticketId: string | number): Promise<PendingAttachment[]> => {
    try {
      const key = `${STORAGE_KEYS.PENDING_ATTACHMENTS}:${ticketId}`;
      const data = await AsyncStorage.getItem(key);
      if (data) {
        return JSON.parse(data) as PendingAttachment[];
      }
      return [];
    } catch (error) {
      console.error('Error getting pending attachments:', error);
      return [];
    }
  },

  removePendingAttachment: async (ticketId: string | number, uri: string): Promise<void> => {
    try {
      const pending = await attachmentStorage.getPendingAttachments(ticketId);
      const updated = pending.filter(att => att.uri !== uri);
      const key = `${STORAGE_KEYS.PENDING_ATTACHMENTS}:${ticketId}`;
      if (updated.length > 0) {
        await AsyncStorage.setItem(key, JSON.stringify(updated));
      } else {
        await AsyncStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Error removing pending attachment:', error);
    }
  },

  clearPendingAttachments: async (ticketId: string | number): Promise<void> => {
    try {
      const key = `${STORAGE_KEYS.PENDING_ATTACHMENTS}:${ticketId}`;
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error clearing pending attachments:', error);
    }
  },

  clearTicketAttachments: async (ticketId: string | number): Promise<void> => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const ticketPrefix = `${STORAGE_KEYS.ATTACHMENTS_METADATA}:${ticketId}:`;
      const ticketKeys = keys.filter(key => key.startsWith(ticketPrefix));

      if (ticketKeys.length > 0) {
        await AsyncStorage.multiRemove(ticketKeys);
      }

      await attachmentStorage.clearPendingAttachments(ticketId);
    } catch (error) {
      console.error('Error clearing ticket attachments:', error);
    }
  },
};
