import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import images from '../assets/images';
import {colors} from '../assets/colors';
import {CarContext} from '../context/CarContext';

const MyCarLabel = ({plate}) => {
  return !!plate ? (
    <>
      <Text style={styles.myCarLabel}>My car</Text>
      <Text style={styles.plate}>{plate}</Text>
    </>
  ) : (
    <View style={{flexDirection: 'row'}}>
      <Text
        style={[
          styles.plate,
          {width: 50, paddingRight: 8, textAlign: 'center'},
        ]}>
        Add plate
      </Text>
      <Image source={images.plus} style={styles.plus} />
    </View>
  );
};

const VehiclePlate = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {plates} = useContext(CarContext);

  const selectedPlate = plates.filter(plate => plate.selected)?.[0]?.value;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MyVehicles')}
      style={[styles.container, {top: insets.top + 8}]}>
      <View style={styles.imageContainer}>
        <Image source={images.carUp} style={styles.car} />
      </View>
      <View style={styles.labelsContainer}>
        <MyCarLabel plate={selectedPlate} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    right: 24,
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
    fontFamily: 'Poppins-Regular',
    color: 'rgba(0,0,0,0.5)',
  },
  plate: {
    fontFamily: 'Poppins-SemiBold',
  },
  plus: {
    width: 12,
    height: 12,
    alignSelf: 'center',
    marginTop: 4,
  },
});

export default VehiclePlate;
