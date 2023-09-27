import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import images from '../assets/images';
import {colors} from '../assets/colors';
import {isAndroid} from '../assets/constants';

const AddPlate = ({onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.touchable}>
        <Image source={images.plate} style={styles.backPlate} />
        <View style={styles.frontPlateContainer}>
          <Image source={images.plate} style={styles.frontPlate} />
          <View style={styles.frontContent}>
            <View style={styles.plusContainer}>
              <Image source={images.plus} style={styles.plus} />
            </View>
            <Text style={styles.addNewPlateLabel}>Add lisence plate</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  touchable: {
    alignSelf: 'center',
    left: -8,
  },
  noVehiclesLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    marginTop: 8,
  },
  backPlate: {
    width: 328,
    height: 124,
    left: 4,
    tintColor: colors.lightBlack,
    borderRadius: 32,
  },
  frontPlateContainer: {
    position: 'absolute',
    zIndex: 10,
    transform: [{rotate: '-9deg'}],
  },
  frontPlate: {
    width: 344,
    height: 126,
    borderRadius: 32,
  },
  frontContent: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 42,
    left: 54,
  },
  addNewPlateLabel: {
    fontSize: 20,
    paddingLeft: 16,
    top: isAndroid ? 2 : 0,
    fontFamily: 'Poppins-Medium',
  },
  plusContainer: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
  plus: {
    width: 16,
    height: 16,
  },
});

export default AddPlate;
