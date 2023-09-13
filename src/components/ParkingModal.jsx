import React, {useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {View, Text, StyleSheet, Image} from 'react-native';

import images from '../assets/images';
import {colors} from '../assets/colors';
import {WIDTH} from '../assets/constants';
import ActiveMarker from './ActiveMarker';
import {mapStyle} from '../assets/mapStyle';
import ParkingFooter from './ParkingFooter';
import ParkingChoices from './ParkingChoices';

const ParkingModal = ({item}) => {
  const [price, setPrice] = useState(null);
  const [methodSelected, setMethodSelected] = useState(null);

  const initialRegion = {
    latitude: item?.latitude,
    longitude: item?.longitude,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  };

  const MINS = 1000 * 60;
  const HOURS = 1000 * 60 * 60;
  const now = new Date();
  const endDay = new Date(new Date().setHours(21, 0, 0));
  const timeDifference = endDay - now;
  const hoursRemaining = Math.floor(timeDifference / HOURS);
  const minsRemaining = Math.floor((timeDifference % HOURS) / MINS);
  const costPerHour = `$${item?.costPerHour?.toFixed(2)}/h`;
  const freeSlots = `${item?.free} slot${item?.free !== 1 ? 's' : ''}`;
  const isOpen = item?.private || (endDay - now) / (1000 * 60) > 0;

  return (
    <BottomSheetScrollView showsVerticalScrollIndicator={false}>
      <View style={{alignItems: 'center'}}>
        {/* Map with marker */}
        <View style={styles.mapContainer}>
          <MapView
            scrollEnabled={false}
            provider="google"
            initialRegion={initialRegion}
            customMapStyle={mapStyle}
            style={styles.mapStyle}>
            <Marker
              coordinate={{
                latitude: item?.latitude,
                longitude: item?.longitude,
              }}>
              <ActiveMarker opacity={1} scale={1} />
            </Marker>
          </MapView>
        </View>

        {/* Parking Info + Cost */}
        <Text style={styles.parkingName}>{item.name}</Text>
        <Text style={styles.address}>{item.address}</Text>

        <View style={styles.rowCenter}>
          <View style={[styles.rowCenter, {marginRight: 24}]}>
            <Image source={images.car} style={styles.icon} />
            <Text style={styles.colorBlack}>{freeSlots}</Text>
          </View>
          <View style={styles.rowCenter}>
            <Image source={images.dollar} style={styles.icon} />
            <Text style={styles.colorBlack}>{costPerHour}</Text>
          </View>
        </View>

        {/* Choices */}
        <ParkingChoices
          isOpen={isOpen}
          isPrivate={item?.private}
          pricePerMinute={item?.costPerHour / 60}
          setPrice={setPrice}
          methodSelected={methodSelected}
          setMethodSelected={setMethodSelected}
          hoursRemaining={hoursRemaining}
          minsRemaining={minsRemaining}
        />
      </View>
      {/* Footer - Price - Button */}
      <ParkingFooter
        price={price}
        canPay={isOpen}
        methodSelected={methodSelected}
      />
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapContainer: {
    overflow: 'hidden',
    width: WIDTH - 64,
    height: WIDTH - 140,
    borderRadius: 48,
  },
  mapStyle: {
    width: WIDTH - 60,
    height: WIDTH - 100,
    borderRadius: 48,
    marginTop: 12,
  },
  parkingName: {
    fontFamily: 'Poppins-SemiBold',
    marginTop: 16,
    color: colors.lightBlack,
    fontSize: 32,
  },
  address: {
    fontFamily: 'Poppins-Regular',
    marginBottom: 16,
    fontSize: 16,
    color: 'rgba(0,0,0,0.5)',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  colorBlack: {
    fontFamily: 'Poppins-Medium',
    color: colors.lightBlack,
    fontSize: 16,
  },
  choicesContainer: {
    marginTop: 16,
  },
  choicesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ParkingModal;
