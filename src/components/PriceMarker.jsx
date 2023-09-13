import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

import {colors} from '../assets/colors';
import {isAndroid} from '../assets/constants';

const PriceMarker = ({opacity, price}) => {
  return (
    <Animated.View style={[styles.container, {opacity}]}>
      <View style={styles.box} />
      <View style={styles.triangle} />
      <Text style={styles.label}>{`$${price?.toFixed(1)}`}</Text>
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
    width: 50,
    height: 36,
    borderRadius: 14,
  },
  triangle: {
    position: 'absolute',
    backgroundColor: colors.lightBlack,
    alignSelf: 'center',
    width: 8,
    height: 8,
    bottom: 18,
    transform: [{rotate: '45deg'}],
  },
  label: {
    top: isAndroid ? 2 : 0,
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 14,
  },
});

export default PriceMarker;
