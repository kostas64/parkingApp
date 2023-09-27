import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import images from '../assets/images';
import {colors} from '../assets/colors';
import Button from '../components/Button';
import {CarContext} from '../context/CarContext';
import useBackAction from '../hooks/useBackAction';

const Confirmation = ({navigation, route}) => {
  useBackAction();
  const insets = useSafeAreaInsets();
  const {plates, setHistory} = useContext(CarContext);

  const selectedPlate = plates.filter(plate => plate.selected)?.[0]?.value;

  const {item, price, full, timeSelection, methodSelected} =
    route?.params || {};

  const dateWithMinutesChanged = new Date().setHours(
    new Date().getHours() + timeSelection?.hours,
  );

  const date = new Date(dateWithMinutesChanged).setMinutes(
    new Date().getMinutes() + timeSelection?.minutes,
  );

  const dateHours =
    new Date(date)?.getHours() <= 9
      ? `0${new Date(date)?.getHours()}`
      : new Date(date)?.getHours();

  const dateMinutes =
    new Date(date)?.getMinutes() <= 9
      ? `0${new Date(date)?.getMinutes()}`
      : new Date(date)?.getMinutes();

  const subtitle =
    (!!full || methodSelected === 'allDay') && !item.private
      ? `You can park until 09:00 tomorrow`
      : `Use the barcode to enter and park until ${dateHours}:${dateMinutes}`;

  const onPress = () => {
    setHistory(oldHistory => [
      {
        img: item.img,
        parkFrom: new Date(),
        parkUntil: !date
          ? new Date(new Date().setHours(21, 0, 0))
          : new Date(date),
        fee: price.toFixed(2),
        parkName: item.name,
        address: item.address,
        plate: selectedPlate,
      },
      ...oldHistory,
    ]);

    navigation.replace('Home');
  };

  return (
    <View
      style={[
        styles.container,
        {paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 16},
      ]}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={[styles.title, {marginTop: insets.top + 24}]}>
          Payment confirmed
        </Text>

        <View style={styles.qrContainer}>
          <Image
            source={item?.private ? images.qr : item?.img}
            style={styles.qrImg}
          />
        </View>

        <Text style={styles.tip}>{subtitle}</Text>

        <Text style={styles.parkName}>{item.name}</Text>
        <Text style={styles.parkAddress}>{item.address}</Text>

        <Text style={styles.parkName}>{`Total fee: $${price.toFixed(2)}`}</Text>
      </View>

      <Button label={'Go home'} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.lightBlack,
    fontSize: 32,
  },
  qrContainer: {
    marginTop: 32,
    padding: 24,
    borderRadius: 24,
    backgroundColor: 'white',
    shadowColor: colors.lightBlack,
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 16,
    },
    elevation: 5,
  },
  qrImg: {
    width: 128,
    height: 128,
    borderRadius: 8,
  },
  tip: {
    width: 220,
    fontSize: 16,
    marginTop: 24,
    textAlign: 'center',
    color: colors.lightBlack,
    fontFamily: 'Poppins-SemiBold',
  },
  parkName: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    marginTop: 24,
    color: colors.lightBlack,
  },
  parkAddress: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'rgba(0,0,0,0.5)',
  },
});

export default Confirmation;
