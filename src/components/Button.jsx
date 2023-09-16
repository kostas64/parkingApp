import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

import {colors} from '../assets/colors';
import {isAndroid} from '../assets/constants';

const Button = ({onPress, isDisabled, label, containerStyle}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.buttonContainer,
        containerStyle,
        {opacity: isDisabled ? 0.4 : 1},
      ]}>
      <Text style={styles.pay}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    backgroundColor: colors.yellow,
    paddingVertical: 14,
    width: 190,
    alignItems: 'center',
  },
  pay: {
    top: isAndroid ? 2 : 0,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
});

export default Button;
