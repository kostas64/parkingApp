import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import HomeStack from './src/router/HomeStack';
import CarContextProvider from './src/context/CarContext';
import StatusBarManager from './src/components/StatusBarManager';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.flex}>
      <NavigationContainer>
        <StatusBarManager>
          <CarContextProvider>
            <HomeStack />
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
