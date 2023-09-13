import React from 'react';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import Search from '../screens/Search';
import {isAndroid} from '../assets/constants';

const Stack = createStackNavigator();

const HomeStack = () => {
  const modalOptions = {
    presentation: 'modal',
    gestureEnabled: true,
    ...(isAndroid && TransitionPresets.ModalPresentationIOS),
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} options={modalOptions} />
    </Stack.Navigator>
  );
};

export default HomeStack;
