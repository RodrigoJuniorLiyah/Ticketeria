import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setNetworkMode } from '../services/TicketApi';

interface NetworkContextData {
  isOnline: boolean;
  toggleNetwork: () => void;
}

const NetworkContext = createContext<NetworkContextData>({} as NetworkContextData);

const NETWORK_STORAGE_KEY = '@ticketeria:network_mode';

export const NetworkProvider = ({ children }: { children: ReactNode }) => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const loadNetworkMode = async () => {
      try {
        const savedMode = await AsyncStorage.getItem(NETWORK_STORAGE_KEY);
        if (savedMode === 'offline' || savedMode === 'online') {
          const mode = savedMode === 'online';
          setIsOnline(mode);
          setNetworkMode(mode);
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

