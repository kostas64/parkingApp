import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import BoxClock from './BoxClock';
import BoxAllDay from './BoxAllDay';
import {colors} from '../assets/colors';
import FreeParking from './FreeParking';

const ParkingChoices = ({
  isOpen,
  isPrivate,
  methodSelected,
  setMethodSelected,
  hoursRemaining,
  minsRemaining,
  pricePerMinute,
  setPrice,
}) => {
  return isOpen ? (
    <View style={styles.choicesContainer}>
      {!isPrivate && <Text style={styles.label}>Choose method</Text>}
      <View style={[styles.choicesRow, isPrivate && styles.marginTop]}>
        <BoxClock
          isPrivate={isPrivate}
          setPrice={setPrice}
          pricePerMinute={pricePerMinute}
          mins={isPrivate ? 59 : minsRemaining}
          hours={isPrivate ? 24 : hoursRemaining}
          methodSelected={methodSelected}
          setMethodSelected={setMethodSelected}
        />
        {!isPrivate && (
          <>
            <View style={{width: 30}} />
            <BoxAllDay
              isPrivate={isPrivate}
              setPrice={setPrice}
              pricePerMinute={pricePerMinute}
              mins={minsRemaining}
              hours={hoursRemaining}
              methodSelected={methodSelected}
              setMethodSelected={setMethodSelected}
            />
          </>
        )}
      </View>
    </View>
  ) : (
    <FreeParking />
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
  marginTop: {
    marginTop: 16,
  },
});

export default ParkingChoices;
