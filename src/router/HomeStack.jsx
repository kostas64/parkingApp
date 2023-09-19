import React from 'react';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import Search from '../screens/Search';
import History from '../screens/History';
import AddCard from '../screens/AddCard';
import {isAndroid} from '../assets/constants';
import MyVehicles from '../screens/MyVehicles';
import Confirmation from '../screens/Confirmation';
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
        name="AddCard"
        component={AddCard}
        options={SlideFromRightIOS}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={SlideFromRightIOS}
      />
      <Stack.Screen
        name="Confirmation"
        component={Confirmation}
        options={{...SlideFromRightIOS, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
