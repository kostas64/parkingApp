import React from 'react';
import {View, StyleSheet} from 'react-native';

import {colors} from '../assets/colors';

const Checkbox = ({selected}) => {
  return !selected ? (
    <View style={[styles.outerCircle, selected && styles.orangeBg]}>
      <View style={[styles.innerCircle, selected && styles.orangeBg]} />
    </View>
  ) : (
    <View style={[styles.outerCircle, selected && styles.orangeBg]}>
      <View style={styles.inCircleDark} />
    </View>
  );
};

const styles = StyleSheet.create({
  outerCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.lightBlack,
    justifyContent: 'center',
  },
  innerCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  orangeBg: {
    backgroundColor: colors.yellow,
  },
  outCircleDark: {
    borderWidth: 2,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  inCircleDark: {
    backgroundColor: colors.yellow,
    borderColor: 'white',
    borderWidth: 2,
    left: 4,
    borderRadius: 8,
    width: 14,
    height: 14,
  },
});

export default Checkbox;
