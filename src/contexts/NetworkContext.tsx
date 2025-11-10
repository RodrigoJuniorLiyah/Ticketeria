import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setNetworkMode } from '../services/TicketApi';
import { attachmentSync } from '../helpers/attachmentSync';

interface NetworkContextData {
  isOnline: boolean;
  toggleNetwork: () => void;
}

const NetworkContext = createContext<NetworkContextData>({} as NetworkContextData);

const NETWORK_STORAGE_KEY = '@ticketeria:network_mode';

export const NetworkProvider = ({ children }: { children: ReactNode }) => {
  const [isOnline, setIsOnline] = useState(true);
  const wasOfflineRef = useRef(false);
  const isSyncingRef = useRef(false);

  useEffect(() => {
    const loadNetworkMode = async () => {
      try {
        const savedMode = await AsyncStorage.getItem(NETWORK_STORAGE_KEY);
        if (savedMode === 'offline' || savedMode === 'online') {
          const mode = savedMode === 'online';
          setIsOnline(mode);
          setNetworkMode(mode);
          wasOfflineRef.current = !mode;
        } else {
          setNetworkMode(true);
        }
      } catch (error) {
        console.error('Error loading network mode:', error);
        setNetworkMode(true);
      }
    };

    loadNetworkMode();
  }, []);

  useEffect(() => {
    setNetworkMode(isOnline);

    if (isOnline && wasOfflineRef.current && !isSyncingRef.current) {
      isSyncingRef.current = true;
      
      attachmentSync.syncAllPendingAttachments().then((result) => {
        if (result.synced > 0) {
          console.log(`Sincronizados ${result.synced} anexo(s) pendente(s)`);
        }
        isSyncingRef.current = false;
      }).catch(() => {
        isSyncingRef.current = false;
      });
    }

    wasOfflineRef.current = !isOnline;
  }, [isOnline]);

  const toggleNetwork = useCallback(async () => {
    const newMode = !isOnline;
    setIsOnline(newMode);
    try {
      await AsyncStorage.setItem(NETWORK_STORAGE_KEY, newMode ? 'online' : 'offline');
    } catch (error) {
      console.error('Error saving network mode:', error);
    }
  }, [isOnline]);

  return (
    <NetworkContext.Provider value={{ isOnline, toggleNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = (): NetworkContextData => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
};

