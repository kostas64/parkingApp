import React, {useEffect, useImperativeHandle, useState} from 'react';
import {View, Text, Image, StyleSheet, Animated} from 'react-native';

import images from '../assets/images';
import {colors} from '../assets/colors';
import {WIDTH} from '../assets/constants';

const CreditCard = React.forwardRef(
  ({number, expDate = '●●/●●', ccv = '●●●', animOpacity, cardType}, ref) => {
    const [numberSt, setNumberSt] = useState('●●●● ●●●● ●●●● ●●●●');
    const [expDateSt, setExpDateSt] = useState('●●/●●');
    const [ccvSt, setCcvSt] = useState('●●●');

    const flipAnimation = React.useRef(new Animated.Value(0)).current;

    const flipToFrontStyle = {
      transform: [
        {
          rotateY: flipAnimation.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
          }),
        },
      ],
    };

    const flipToBackStyle = {
      transform: [
        {
          rotateY: flipAnimation.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg'],
          }),
        },
      ],
    };

    const flipToFront = () => {
      Animated.timing(flipAnimation, {
        toValue: 180,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    const flipToBack = () => {
      Animated.timing(flipAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    };

    const formatInput = (input, type) => {
      // Pad the input with placeholders to maintain the original structure
      let formattedInput =
        type === 'number' && cardType !== 'amex'
          ? '●●●● ●●●● ●●●● ●●●●'
          : type === 'number' && cardType === 'amex'
          ? '●●●● ●●●● ●●●● ●●●'
          : type === 'exp'
          ? '●●/●●'
          : '●●●';

      for (let i = 0; i < input.length; i++) {
        formattedInput = formattedInput.replace('●', input[i]);
      }

      return formattedInput;
    };

    const handleInputChange = (text, type) => {
      const sanitizedInput = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
      const formattedInput = formatInput(sanitizedInput, type);

      type === 'number' && setNumberSt(formattedInput);
      type === 'exp' && setExpDateSt(formattedInput);
      type === 'ccv' && setCcvSt(formattedInput);
    };

    useImperativeHandle(
      ref,
      () => ({
        flipToFront,
        flipToBack,
      }),
      [],
    );

    useEffect(() => {
      handleInputChange(number, 'number');
    }, [number, cardType]);

    useEffect(() => {
      handleInputChange(expDate, 'exp');
    }, [expDate]);

    useEffect(() => {
      handleInputChange(ccv, 'ccv');
    }, [ccv]);

    return (
      <View style={{marginTop: 24}}>
        <Animated.View style={[styles.backContainer, flipToBackStyle]}>
          <View style={styles.blackLine} />
          <View style={styles.cvvContainer}>
            <Text style={styles.expDate}>CVV</Text>
            <View style={styles.cvvBox}>
              <Text style={styles.cardNumber}>{ccvSt}</Text>
            </View>
          </View>
        </Animated.View>
        <Animated.View style={[styles.frontContainer, flipToFrontStyle]}>
          <View style={styles.firstRow}>
            <Image source={images.chip} style={styles.chip} />
            <Image source={images.wifi} style={styles.wifi} />
          </View>
          <Text style={styles.cardNumber}>{numberSt}</Text>
          <View style={styles.cardTypeIconCont}>
            <View>
              <Text style={styles.expDate}>Expiration date</Text>
              <Text style={styles.expDateLabel}>{expDateSt}</Text>
            </View>
            <Animated.Image
              source={images?.[cardType]}
              style={[styles.cardTypeIcon, {opacity: animOpacity}]}
            />
          </View>
        </Animated.View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  frontContainer: {
    position: 'absolute',
    paddingVertical: 20,
    paddingHorizontal: 24,
    height: WIDTH / 2,
    width: WIDTH - 48,
    alignSelf: 'center',
    borderRadius: 16,
    backgroundColor: colors.yellow,
    justifyContent: 'space-between',
    backfaceVisibility: 'hidden',
  },
  backContainer: {
    width: WIDTH - 48,
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
    height: WIDTH / 2,
    borderRadius: 16,
    backgroundColor: colors.yellow,
    backfaceVisibility: 'hidden',
  },
  cvvBox: {
    marginTop: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingBottom: 4,
    width: 78,
    height: 46,
  },
  blackLine: {
    height: 30,
    width: WIDTH - 48,
    left: -24,
    backgroundColor: colors.lightBlack,
  },
  cvvContainer: {
    marginTop: 8,
    alignSelf: 'flex-end',
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

export default CreditCard;
