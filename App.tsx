import React from 'react';
import {StyleSheet} from 'react-native';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

import {colors} from './src/assets/colors';
import DrawerStack from './src/router/DrawerStack';
import CarContextProvider from './src/context/CarContext';
import StatusBarManager from './src/components/StatusBarManager';

export const storage = new MMKVLoader().initialize();

const App = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.yellow,
    },
  };

  return (
    <GestureHandlerRootView style={styles.flex}>
      <NavigationContainer theme={theme}>
        <StatusBarManager>
          <CarContextProvider>
            <DrawerStack />
          </CarContextProvider>
        </StatusBarManager>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default App;
