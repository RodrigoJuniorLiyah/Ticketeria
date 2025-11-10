import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TicketList from '../pages/Ticketeria';
import CreateTicket from '../pages/Ticketeria/CreateTicket';
import TicketDetails from '../pages/Ticketeria/TicketDetails';

import { theme } from '../styles/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TicketStack = () => {
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

const AppRoutes = () => {
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
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;

