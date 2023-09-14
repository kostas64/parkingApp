import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import HomeStack from './HomeStack';
import images from '../assets/images';
import {colors} from '../assets/colors';

const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({label, icon}) => {
  return (
    <TouchableOpacity style={styles.drawerItemContainer}>
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

        <CustomDrawerItem label="Park" icon="parking" />
        <CustomDrawerItem label="Payment Methods" icon="wallet" />
        <CustomDrawerItem label="History" icon="history" />
        <View style={styles.hr} />
        <Text style={styles.implementedWith}>Implemented with:</Text>
        <Text style={[styles.implementedWith, {paddingTop: 0}]}>
          Reanimated
        </Text>
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
  implementedWith: {
    paddingLeft: 8,
    paddingVertical: 16,
    color: colors.lightBlack,
    fontSize: 18,
    fontWeight: '500',
  },
  marginBottom: {
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
    width: 24,
    height: 24,
    tintColor: colors.lightBlack,
  },
});

export default DrawerStack;
