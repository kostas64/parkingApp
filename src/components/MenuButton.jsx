import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {colors} from '../assets/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const MenuButton = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      onPress={navigation.openDrawer}
      style={[styles.container, {top: insets.top + 8}]}>
      <View style={styles.upperLine} />
      <View style={styles.bottomLine} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 16,
    left: 24,
    backgroundColor: 'white',
    zIndex: 100,
    borderRadius: 24,
    height: 62,
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 2.5,
    shadowOpacity: 0.2,
    elevation: 13,
  },
  upperLine: {
    backgroundColor: colors.lightBlack,
    height: 4,
    borderRadius: 4,
    width: 20,
  },
  bottomLine: {
    marginTop: 4,
    backgroundColor: 'rgba(0,0,0,0.25)',
    height: 4,
    borderRadius: 4,
    width: 20,
  },
});

export default MenuButton;
