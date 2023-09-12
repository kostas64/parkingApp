import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import images from '../assets/images';
import {colors} from '../assets/colors';

const CarPlate = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={images.carUp} style={styles.car} />
      </View>
      <View style={styles.labelsContainer}>
        <Text style={styles.myCarLabel}>My car</Text>
        <Text style={styles.plate}>NKY-3148</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 100,
    paddingLeft: 4,
    paddingVertical: 4,
    paddingRight: 12,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 2.5,
    shadowOpacity: 0.2,
    elevation: 13,
  },
  imageContainer: {
    backgroundColor: colors.lightBlack,
    padding: 12,
    borderRadius: 20,
  },
  car: {
    width: 30,
    height: 30,
  },
  labelsContainer: {
    paddingLeft: 12,
  },
  myCarLabel: {
    color: 'rgba(0,0,0,0.5)',
  },
  plate: {
    fontWeight: '700',
  },
});

export default CarPlate;
