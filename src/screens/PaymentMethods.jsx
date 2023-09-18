import React, {useContext} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

import images from '../assets/images';
import {colors} from '../assets/colors';
import Header from '../components/Header';
import {WIDTH} from '../assets/constants';
import {CarContext} from '../context/CarContext';

const PaymentMethods = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {credits} = useContext(CarContext);

  const renderItem = ({item, index}) => {
    return (
      <View key={`card-${index}`} style={styles.frontContainer}>
        <View style={styles.firstRow}>
          <Image source={images.chip} style={styles.chip} />
          <Image source={images.wifi} style={styles.wifi} />
        </View>
        <Text style={styles.cardNumber}>{item.cardNumber}</Text>
        <View style={styles.cardTypeIconCont}>
          <View>
            <Text style={styles.expDate}>Expiration date</Text>
            <Text style={styles.expDateLabel}>{item.expDate}</Text>
          </View>
          <Image source={images?.[item.type]} style={styles.cardTypeIcon} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        label={'Payment Methods'}
        leftIcon={images.chevron}
        onPressLeft={() => navigation.pop()}
        rightIcon={images.plus}
        onPressRight={() => navigation.navigate('AddCard')}
      />

      <FlatList
        data={credits}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: insets.bottom > 0 ? insets.bottom : 24,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  frontContainer: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    height: WIDTH / 2,
    width: WIDTH - 48,
    alignSelf: 'center',
    borderRadius: 16,
    backgroundColor: colors.yellow,
    justifyContent: 'space-between',
    marginTop: 16,
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chip: {
    width: 28,
    height: 28,
  },
  wifi: {
    width: 28,
    height: 28,
    tintColor: colors.lightBlack,
    transform: [{rotate: '90deg'}],
  },
  cardNumber: {
    color: colors.lightBlack,
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 10,
  },
  expDate: {
    color: colors.lightBlack,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 8,
  },
  expDateLabel: {
    color: colors.lightBlack,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 2,
  },
  cardTypeIconCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTypeIcon: {
    width: 42,
    height: 42,
    alignSelf: 'flex-end',
  },
});

export default PaymentMethods;
