import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

import {colors} from '../assets/colors';
import {isAndroid} from '../assets/constants';

const PriceMarker = ({opacity}) => {
  return (
    <Animated.View style={[styles.container, {opacity}]}>
      <View style={styles.box} />
      <View style={styles.triangle} />
      <Text style={styles.label}>$2</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    position: 'absolute',
    backgroundColor: colors.lightBlack,
    width: 42,
    height: 42,
    borderRadius: 16,
  },
  triangle: {
    position: 'absolute',
    backgroundColor: colors.lightBlack,
    alignSelf: 'center',
    width: 12,
    height: 12,
    bottom: 16,
    transform: [{rotate: '45deg'}],
  },
  label: {
    top: isAndroid ? 2 : 0,
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 18,
  },
});

export default PriceMarker;
