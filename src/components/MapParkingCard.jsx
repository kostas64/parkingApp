import React, {useEffect, useRef, useState} from 'react';
import {Directions, FlingGestureHandler} from 'react-native-gesture-handler';
import {View, Text, Image, Animated, StyleSheet, Pressable} from 'react-native';

import images from '../assets/images';
import {colors} from '../assets/colors';
import {WIDTH} from '../assets/constants';
import {markers} from '../assets/markers';

const AnimPressable = Animated.createAnimatedComponent(Pressable);

const MapParkingCard = ({max, openModal, selectedSlot, setSelectedSlot}) => {
  const [state, setState] = useState(selectedSlot);
  const opacityRef = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selectedSlot >= 0) {
      Animated.parallel([
        Animated.timing(opacityRef, {
          toValue: 0.2,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 8,
          duration: 80,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setState(selectedSlot);
        Animated.parallel([
          Animated.timing(opacityRef, {
            toValue: 1,
            duration: 320,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 320,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }
  }, [selectedSlot]);

  return (
    <FlingGestureHandler
      direction={Directions.RIGHT}
      onActivated={() =>
        selectedSlot < max - 1 && setSelectedSlot(old => old + 1)
      }>
      <FlingGestureHandler
        direction={Directions.LEFT}
        onActivated={() => selectedSlot > 0 && setSelectedSlot(old => old - 1)}>
        <AnimPressable
          onPress={() => openModal(markers?.[state])}
          style={[
            styles.container,
            {opacity: opacityRef, transform: [{translateY}]},
          ]}>
          <View style={styles.leftBody}>
            {/* Title & Address */}
            <View>
              <Text style={styles.name}>{markers?.[state]?.name}</Text>
              <Text numberOfLines={2} style={styles.address}>
                {markers?.[state]?.address}
              </Text>
            </View>
            {/* Slots & Cost */}
            <View style={styles.rowCenter}>
              <View style={[styles.rowCenter, {marginRight: 28}]}>
                <Image source={images.car} style={[styles.icon]} />
                <Text style={styles.colorBlack}>{`${
                  markers?.[state]?.free
                } slot${markers?.[state]?.free !== 1 ? 's' : ''}`}</Text>
              </View>
              <View style={styles.rowCenter}>
                <Image source={images.dollar} style={styles.icon} />
                <Text style={styles.colorBlack}>{`$${markers?.[
                  state
                ]?.costPerHour?.toFixed(2)}/h`}</Text>
              </View>
            </View>
          </View>
          {/* Right Image */}
          <Image source={markers?.[state]?.img} style={styles.image} />
        </AnimPressable>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 2.5,
    shadowOpacity: 0.2,
    elevation: 3,
    position: 'absolute',
    bottom: 32,
    left: 24,
    backgroundColor: 'white',
    width: WIDTH - 48,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
  },
  leftBody: {
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: 'Poppins-Medium',
    color: colors.lightBlack,
    paddingBottom: 2,
    fontSize: 18,
    fontWeight: '700',
  },
  address: {
    fontFamily: 'Poppins-Regular',
    width: WIDTH - 96 - 96,
    color: 'rgba(0,0,0,0.5)',
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 24,
  },
  colorBlack: {
    fontFamily: 'Poppins-Regular',
    color: colors.lightBlack,
  },
});

export default MapParkingCard;
