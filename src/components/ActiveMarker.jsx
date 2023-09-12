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
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.yellow,
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  triangle: {
    position: 'absolute',
    backgroundColor: colors.yellow,
    alignSelf: 'center',
    width: 20,
    height: 20,
    bottom: 11,
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
    height: 8,
    backgroundColor: colors.yellow,
    top: 80,
    left: 39,
    borderRadius: 10,
    opacity: 0.35,
  },
});

export default ActiveMarker;
