import React from 'react';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import Search from '../screens/Search';
import History from '../screens/History';
import {isAndroid} from '../assets/constants';
import MyVehicles from '../screens/MyVehicles';
import PaymentMethods from '../screens/PaymentMethods';

const Stack = createStackNavigator();

const HomeStack = () => {
  const modalOptions = {
    presentation: 'modal',
    gestureEnabled: true,
    ...(isAndroid && TransitionPresets.ModalPresentationIOS),
  };

  const SlideFromRightIOS = {
    ...TransitionPresets.SlideFromRightIOS,
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="MyVehicles"
        component={MyVehicles}
        options={SlideFromRightIOS}
      />
      <Stack.Screen name="Search" component={Search} options={modalOptions} />
      <Stack.Screen
        name="PaymentMethods"
        component={PaymentMethods}
        options={SlideFromRightIOS}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={SlideFromRightIOS}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
