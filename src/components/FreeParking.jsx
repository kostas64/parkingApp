import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {colors} from '../assets/colors';

const FreeParking = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Public parking slots are free after 21:00
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 220,
    marginTop: 32,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderRadius: 16,
    padding: 16,
    elevation: 5,
    marginBottom: 8,
  },
  label: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.lightBlack,
    fontFamily: 'Poppins-Medium',
  },
});

export default FreeParking;
