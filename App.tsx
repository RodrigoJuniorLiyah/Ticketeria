import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import AppRoutes from './src/routes/App.routes';

const GestureContainer = styled(GestureHandlerRootView)`
  flex: 1;
`;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureContainer>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppRoutes />
      </SafeAreaProvider>
    </GestureContainer>
  );
};

export default App;
