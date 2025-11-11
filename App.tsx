import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components/native';

import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { NetworkProvider } from './src/contexts/NetworkContext';
import { AuthProvider } from './src/contexts/AuthContext';
import AppRoutes from './src/routes/App.routes';

const GestureContainer = styled(GestureHandlerRootView)`
  flex: 1;
`;

const AppContent = () => {
  const { theme, themeMode } = useTheme();

  return (
    <StyledThemeProvider theme={theme}>
      <StatusBar
        barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.surface}
      />
      <AppRoutes />
    </StyledThemeProvider>
  );
};

const App = () => (
  <ThemeProvider>
    <NetworkProvider>
      <AuthProvider>
        <GestureContainer>
          <SafeAreaProvider>
            <AppContent />
          </SafeAreaProvider>
        </GestureContainer>
      </AuthProvider>
    </NetworkProvider>
  </ThemeProvider>
);

export default App;
