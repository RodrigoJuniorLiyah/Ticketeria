import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import styled from 'styled-components/native';

import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
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

const App = () => {
  return (
    <ThemeProvider>
      <GestureContainer>
        <SafeAreaProvider>
          <AppContent />
        </SafeAreaProvider>
      </GestureContainer>
    </ThemeProvider>
  );
};

export default App;
