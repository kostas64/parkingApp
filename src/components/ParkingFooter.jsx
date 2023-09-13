import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {colors} from '../assets/colors';

const ParkingFooter = ({price, canPay, methodSelected}) => {
  if (!canPay) return;

  const insets = useSafeAreaInsets();
  const isDisabled = !methodSelected || !price;
  const amount = isDisabled ? 0 : price;
  const marginBottom = insets.bottom > 0 ? insets.bottom : 24;

  return (
    <View style={[styles.container, {marginBottom}]}>
      <Text style={styles.price}>{`$${amount?.toFixed(2)}`}</Text>
      <TouchableOpacity
        disabled={isDisabled}
        style={[styles.buttonContainer, {opacity: isDisabled ? 0.4 : 1}]}>
        <Text style={styles.pay}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
    marginTop: 36,
  },
  price: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
  },
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

export default ParkingFooter;
