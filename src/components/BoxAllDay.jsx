import React from 'react';
import {Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import images from '../assets/images';
import {colors} from '../assets/colors';

const BoxAllDay = ({
  hours,
  mins,
  setPrice,
  pricePerMinute,
  methodSelected,
  setMethodSelected,
}) => {
  const isSelected = methodSelected === 'allDay';
  const backgroundColor = isSelected ? colors.yellow : 'white';

  const onPress = () => {
    setMethodSelected('allDay');
    setPrice(pricePerMinute * mins + pricePerMinute * hours * 60);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {backgroundColor}]}>
      <Image source={images.fullTime} style={styles.clock} />
      <Text style={styles.parkLabel}>Charge until the end</Text>
      <Text style={styles.time}>{`${hours} h ${mins} m`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 12},
    shadowRadius: 10,
    shadowOpacity: 0.1,
    borderRadius: 16,
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 16,
    width: 160,
  },
  clock: {
    tintColor: colors.lightBlack,
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  parkLabel: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 24,
    width: 90,
  },
  time: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
  },
});

export default BoxAllDay;
