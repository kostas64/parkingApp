import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {WIDTH, isAndroid} from '../assets/constants';

const SkipButton = ({onPress}) => {
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {top: insets.top > 0 ? insets.top + 8 : 24}]}>
      <Text style={styles.label}>Skip</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: WIDTH * 0.08,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#b39e28',
    zIndex: 1,
  },
  label: {
    top: isAndroid ? 2 : 0,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: 'white',
  },
});

export default SkipButton;
