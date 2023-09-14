import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

import {colors} from '../assets/colors';

const Button = ({onPress, isDisabled, label}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[styles.buttonContainer, {opacity: isDisabled ? 0.4 : 1}]}>
      <Text style={styles.pay}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    backgroundColor: colors.yellow,
    paddingVertical: 16,
    width: 190,
    alignItems: 'center',
  },
  pay: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
});

export default Button;
