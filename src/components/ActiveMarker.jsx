import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

import {colors} from '../assets/colors';
import {isAndroid} from '../assets/constants';

const ActiveMarker = ({opacity, scale}) => {
  return (
    <Animated.View style={[styles.container, {opacity, transform: [{scale}]}]}>
      <View style={styles.box}>
        <Text style={styles.label}>P</Text>
      </View>
      <View style={styles.triangle} />
      <View style={styles.yellowDot} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 90,
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.yellow,
    width: 58,
    height: 58,
    top: 4,
    left: (90 - 58 * 1.18) / 2,
    borderRadius: 20,
  },
  triangle: {
    backgroundColor: colors.yellow,
    left: (90 - 30) / 2,
    width: 20,
    height: 20,
    bottom: 14,
    transform: [{rotate: '45deg'}],
  },
  label: {
    top: isAndroid ? 2 : 1,
    fontFamily: 'Poppins-SemiBold',
    color: colors.lightBlack,
    fontSize: 32,
  },
  yellowDot: {
    position: 'absolute',
    width: 12,
    height: 6,
    backgroundColor: colors.yellow,
    top: 66,
    left: (90 - 22) / 2,
    borderRadius: 10,
    opacity: 0.4,
  },
});

export default ActiveMarker;
