import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '../contexts/ThemeContext';
import TicketList from '../pages/Ticketeria';
import CreateTicket from '../pages/Ticketeria/CreateTicket';
import TicketDetails from '../pages/Ticketeria/TicketDetails';

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

const AppRoutes = () => {
  const { theme, themeMode, toggleTheme } = useTheme();

  return (
    <NavigationContainer>
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
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;

