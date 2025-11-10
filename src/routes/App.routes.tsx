import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

import { useTheme } from '../contexts/ThemeContext';
import { useNetwork } from '../contexts/NetworkContext';
import { useAuth } from '../contexts/AuthContext';
import TicketList from '../pages/Ticketeria';
import CreateTicket from '../pages/Ticketeria/CreateTicket';
import TicketDetails from '../pages/Ticketeria/TicketDetails';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TicketStack = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen
        name="TicketList"
        component={TicketList}
        options={{ title: 'Tickets' }}
      />
      <Stack.Screen
        name="CreateTicket"
        component={CreateTicket}
        options={{ title: 'Novo Ticket' }}
      />
      <Stack.Screen
        name="TicketDetails"
        component={TicketDetails}
        options={{ title: 'Detalhes do Ticket' }}
      />
    </Stack.Navigator>
  );
};

const ThemeToggleScreen = () => {
  return null;
};

const NetworkToggleScreen = () => {
  return null;
};

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const AuthStack = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const AppRoutes = () => {
  const { theme, themeMode, toggleTheme } = useTheme();
  const { isOnline, toggleNetwork } = useNetwork();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </LoadingContainer>
    );
  }

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <AuthStack />
      ) : (
        <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
          },
          tabBarLabelStyle: {
            fontSize: theme.fontSize.xs,
            fontWeight: '600',
          },
        }}
      >
        <Tab.Screen
          name="Tickets"
          component={TicketStack}
          options={{
            tabBarLabel: 'Tickets',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ticket-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="ThemeToggle"
          component={ThemeToggleScreen}
          options={{
            tabBarLabel: themeMode === 'dark' ? 'Claro' : 'Escuro',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name={themeMode === 'dark' ? 'sunny-outline' : 'moon-outline'}
                size={size}
                color={color}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              toggleTheme();
            },
          }}
        />
        <Tab.Screen
          name="NetworkToggle"
          component={NetworkToggleScreen}
          options={{
            tabBarLabel: isOnline ? 'Online' : 'Offline',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name={isOnline ? 'cloud-outline' : 'cloud-offline-outline'}
                size={size}
                color={isOnline ? theme.colors.primary : theme.colors.error}
              />
            ),
            tabBarActiveTintColor: isOnline ? theme.colors.primary : theme.colors.error,
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              toggleNetwork();
            },
          }}
        />
      </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppRoutes;

