import AsyncStorage from '@react-native-async-storage/async-storage';

import { TicketApi } from '../services/TicketApi';
import { attachmentStorage } from './attachmentStorage';
import { ticketStorage } from './ticketStorage';

interface PendingAttachment {
  ticketId: string | number;
  uri: string;
  name: string;
  type: string;
  size: number;
  createdAt: string;
}

// Sincroniza anexos que ficaram pendentes quando estava offline
export const attachmentSync = {
  syncPendingAttachments: async (ticketId: string | number): Promise<void> => {
    try {
      const pendingAttachments = await attachmentStorage.getPendingAttachments(ticketId);

      if (pendingAttachments.length === 0) {
        return;
      }

      const syncedAttachments: string[] = [];
      const failedAttachments: PendingAttachment[] = [];

      for (const pending of pendingAttachments) {
        try {
          const uploadedAttachment = await TicketApi.uploadAttachment(ticketId, {
            uri: pending.uri,
            type: pending.type,
            name: pending.name,
          });

          await attachmentStorage.saveAttachmentMetadata(
            ticketId,
            uploadedAttachment as any,
            pending.uri
          );

          await attachmentStorage.removePendingAttachment(ticketId, pending.uri);
          syncedAttachments.push(pending.name);
        } catch (error) {
          const isNetworkError = error instanceof Error && (error as any).isNetworkError;
          if (!isNetworkError) {
            failedAttachments.push(pending);
          }
        }
      }

      if (syncedAttachments.length > 0) {
        const ticket = await ticketStorage.getTicketDetails(ticketId);
        if (ticket) {
          const updatedTicket = await TicketApi.getById(ticketId);
          await ticketStorage.saveTicketDetails(ticketId, updatedTicket);
        }
      }
    } catch (error) {
      console.error('Error syncing pending attachments:', error);
    }
  },

  syncAllPendingAttachments: async (): Promise<{
    synced: number;
    failed: number;
  }> => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const pendingKeys = allKeys.filter((key: string) =>
        key.startsWith('@ticketeria:pending_attachments:')
      );

      if (pendingKeys.length === 0) {
        return { synced: 0, failed: 0 };
      }

      let totalSynced = 0;
      let totalFailed = 0;

      for (const key of pendingKeys) {
        const ticketIdMatch = key.match(/@ticketeria:pending_attachments:(.+)/);
        if (ticketIdMatch && ticketIdMatch[1]) {
          const ticketId = ticketIdMatch[1];
          try {
            await attachmentSync.syncPendingAttachments(ticketId);
            const remaining = await attachmentStorage.getPendingAttachments(ticketId);
            if (remaining.length === 0) {
              totalSynced++;
            } else {
              totalFailed++;
            }
          } catch {
            totalFailed++;
          }
        }
      }

      return { synced: totalSynced, failed: totalFailed };
    } catch (error) {
      console.error('Error syncing all pending attachments:', error);
      return { synced: 0, failed: 0 };
    }
  },
};

