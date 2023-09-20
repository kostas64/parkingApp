import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import HomeStack from './HomeStack';
import images from '../assets/images';
import {colors} from '../assets/colors';

const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({label, icon, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.drawerItemContainer}>
      <Image source={images[icon]} style={styles.icon} />
      <Text style={styles.drawerItemLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = ({navigation}) => {
  return (
    <DrawerContentScrollView
      scrollEnabled={false}
      contentContainerStyle={styles.flex}>
      <View style={styles.drawerScroll}>
        <TouchableOpacity
          style={styles.marginBottom}
          onPress={() => navigation.closeDrawer()}>
          <Image source={images.close} style={styles.icon} />
        </TouchableOpacity>

        <CustomDrawerItem
          label="Park"
          icon="parking"
          onPress={() => navigation.navigate('Home')}
        />
        <CustomDrawerItem
          label="Payment Methods"
          icon="wallet"
          onPress={() => navigation.navigate('PaymentMethods')}
        />
        <CustomDrawerItem
          label="My Vehicles"
          icon="platesIcon"
          onPress={() => navigation.navigate('MyVehicles')}
        />
        <CustomDrawerItem
          label="History"
          icon="history"
          onPress={() => navigation.navigate('History')}
        />
        <View style={styles.hr} />
        <Text style={styles.name}>ParkingApp</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerStack = () => {
  const screenOptions = {
    headerShown: false,
    drawerType: 'slide',
    swipeEdgeWidth: 0,
    overlayColor: 'transparent',
    sceneContainerStyle: styles.sceneContainerStyle,
    drawerStyle: styles.drawerStyle,
  };

  return (
    <View style={styles.navigatorContainer}>
      <Drawer.Navigator
        drawerContent={props => {
          return <CustomDrawerContent navigation={props.navigation} />;
        }}
        screenOptions={screenOptions}>
        <Drawer.Screen name="HomeStack" component={HomeStack} />
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  navigatorContainer: {
    flex: 1,
    backgroundColor: colors.yellow,
  },
  sceneContainerStyle: {
    backgroundColor: 'transparent',
  },
  drawerStyle: {
    flex: 1,
    width: '65%',
    paddingRight: 20,
    backgroundColor: 'transparent',
  },
  hr: {
    height: 1,
    backgroundColor: colors.lightBlack,
    left: 8,
  },
  marginBottom: {
    marginTop: 8,
    marginLeft: 8,
    marginBottom: 32,
  },
  drawerScroll: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  drawerItemContainer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  drawerItemLabel: {
    fontFamily: 'Poppins-Regular',
    color: colors.lightBlack,
    marginLeft: 15,
    fontSize: 16,
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: colors.lightBlack,
  },
  name: {
    color: colors.lightBlack,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    margin: 8,
  },
});

export default DrawerStack;
