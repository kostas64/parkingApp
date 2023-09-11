import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

import {colors} from '../assets/colors';

const ActiveMarker = ({opacity, scale}) => {
  return (
    <Animated.View style={[styles.container, {opacity, transform: [{scale}]}]}>
      <View style={styles.box} />
      <View style={styles.triangle} />
      <Text style={styles.label}>P</Text>
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
    color: colors.lightBlack,
    fontWeight: '700',
    fontSize: 28,
  },
});

export default ActiveMarker;
