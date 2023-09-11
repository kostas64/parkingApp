import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {colors} from '../assets/colors';

const PriceMarker = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box} />
      <View style={styles.triangle} />
      <Text style={styles.label}>$2</Text>
    </View>
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
    backgroundColor: colors.lightBlack,
    width: 48,
    height: 48,
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
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  },
});

export default PriceMarker;
