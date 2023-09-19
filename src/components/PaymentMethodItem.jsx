import Animated, {
  runOnJS,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';

import images from '../assets/images';
import {colors} from '../assets/colors';
import {WIDTH} from '../assets/constants';

const TRANSLATE_THRESHOLD = -70;

const PaymentMethodItem = ({item, onDismissItem}) => {
  const opacityTrash = useSharedValue(1);
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(WIDTH / 2);
  const marginTop = useSharedValue(16);
  const paddingVertical = useSharedValue(20);

  const panHandlerEvent = useAnimatedGestureHandler({
    onActive: event => {
      translateX.value = event.translationX;
    },
    onFinish: () => {
      const shouldDismiss = translateX.value < TRANSLATE_THRESHOLD;

      if (shouldDismiss) {
        translateX.value = withTiming(-WIDTH);
        itemHeight.value = withTiming(0);
        marginTop.value = withTiming(0);
        paddingVertical.value = withTiming(0);
        opacityTrash.value = withTiming(0, null, isFinished => {
          isFinished && runOnJS(onDismissItem)(item);
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rTranslateStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const rIconContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityTrash.value,
    };
  });

  const rItemContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginTop: marginTop.value,
      opacity: opacityTrash.value,
      paddingVertical: paddingVertical.value,
    };
  });

  return (
    <>
      <Animated.Image
        source={images.trash}
        style={[styles.trash, rIconContainerStyle]}
      />
      <PanGestureHandler
        activeOffsetX={[0, 10]}
        activeOffsetY={100000000}
        onGestureEvent={panHandlerEvent}>
        <Animated.View
          style={[styles.frontContainer, rItemContainerStyle, rTranslateStyle]}>
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
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  frontContainer: {
    paddingHorizontal: 24,
    width: WIDTH - 48,
    alignSelf: 'center',
    borderRadius: 16,
    backgroundColor: colors.yellow,
    justifyContent: 'space-between',
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
  trash: {
    width: 24,
    height: 24,
    tintColor: colors.lightBlack,
    position: 'absolute',
    top: 16 + (WIDTH - 48 - 32) / 4,
    right: 42,
  },
});

export default PaymentMethodItem;
