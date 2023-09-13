import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import BoxClock from './BoxClock';
import BoxAllDay from './BoxAllDay';
import {colors} from '../assets/colors';

const ParkingChoices = ({
  methodSelected,
  setMethodSelected,
  hoursRemaining,
  minsRemaining,
  pricePerMinute,
  setPrice,
}) => {
  return (
    <View style={styles.choicesContainer}>
      <Text style={styles.label}>Choose method</Text>
      <View style={styles.choicesRow}>
        <BoxClock
          setPrice={setPrice}
          pricePerMinute={pricePerMinute}
          mins={minsRemaining}
          hours={hoursRemaining}
          methodSelected={methodSelected}
          setMethodSelected={setMethodSelected}
        />
        <View style={{width: 30}} />
        <BoxAllDay
          setPrice={setPrice}
          pricePerMinute={pricePerMinute}
          mins={minsRemaining}
          hours={hoursRemaining}
          methodSelected={methodSelected}
          setMethodSelected={setMethodSelected}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: colors.lightBlack,
    marginBottom: 16,
  },
  choicesContainer: {
    marginTop: 16,
  },
  choicesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ParkingChoices;
