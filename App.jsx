import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

import {colors} from './src/assets/colors';
import DrawerStack from './src/router/DrawerStack';
import CarContextProvider from './src/context/CarContext';
import StatusBarManager from './src/components/StatusBarManager';
import AnimatedBootsplash from './src/components/AnimatedBootsplash';

export const storage = new MMKVLoader().initialize();

const App = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.yellow,
    },
  };

  const [loaderPlayed, setLoaderPlayed] = useState(null);
  const isLoaderFalse = loaderPlayed === false;

  const hideSplash = () => {
    BootSplash.hide().then(() => setLoaderPlayed(true));
  };

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.flex}>
        <NavigationContainer theme={theme} onReady={hideSplash}>
          <StatusBarManager>
            <CarContextProvider>
              {!isLoaderFalse && (
                <AnimatedBootsplash
                  onAnimationEnd={() => setLoaderPlayed(false)}
                />
              )}
              {isLoaderFalse && <DrawerStack />}
            </CarContextProvider>
          </StatusBarManager>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default App;
