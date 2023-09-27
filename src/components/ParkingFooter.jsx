import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Button from './Button';
import {CarContext} from '../context/CarContext';

const ParkingFooter = ({price, canPay, onPress, methodSelected}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {plates} = useContext(CarContext);

  const marginBottom = insets.bottom > 0 ? insets.bottom : 24;
  const selectedPlate = plates.filter(plate => plate.selected)?.[0]?.value;

  if (!canPay) return;

  if (!selectedPlate) {
    return (
      <Button
        containerStyle={[styles.buttonContainer, {marginBottom}]}
        label={'Add lisence plate'}
        onPress={() => navigation.navigate('MyVehicles')}
      />
    );
  }

  const isDisabled = !methodSelected || !price || !selectedPlate;
  const amount = isDisabled ? 0 : price;

  return (
    <View style={{marginBottom}}>
      <View style={[styles.container]}>
        <Text style={styles.price}>{`$${amount?.toFixed(2)}`}</Text>
        <Button label={'Pay'} isDisabled={isDisabled} onPress={onPress} />
      </View>
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
    width: 220,
    alignSelf: 'center',
    marginTop: 24,
  },
  pay: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
});

export default ParkingFooter;
