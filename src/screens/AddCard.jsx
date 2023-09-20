import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TextInput, Text, Animated} from 'react-native';

import {
  isExpValid,
  getCardType,
  doesCardExist,
  isCardNumberValid,
} from '../utils/CardUtils';
import images from '../assets/images';
import {colors} from '../assets/colors';
import Header from '../components/Header';
import {WIDTH} from '../assets/constants';
import {CarContext} from '../context/CarContext';
import CreditCard from '../components/CreditCard';

const AddCard = ({navigation}) => {
  const cardRef = useRef();
  const expRef = useRef();
  const ccvRef = useRef();
  const creditCardRef = useRef();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  const {credits, setCredits, setToast} = useContext(CarContext);

  const [ccv, setCcv] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState(null);

  const isCcvValid = ccv.length === 3;

  const onChangeCardNumber = value => {
    let tempState = value.replace('.', '').replace(',', '').replace('-', '');

    if (
      value.length > cardNumber.length &&
      (value.length === 4 || value.length === 9 || value.length === 14)
    ) {
      tempState = tempState + ' ';
    } else if (
      cardNumber.length >= value.length &&
      (value.length === 4 || value.length === 9 || value.length === 14)
    ) {
      tempState = tempState.slice(0, tempState.length - 1);
    }

    tempState.length <= 7 && getCardType(tempState, cardType, setCardType);

    if (
      ((value.length === 18 && cardType === 'amex') ||
        (value.length === 19 && cardType !== 'amex')) &&
      isCardNumberValid(tempState, cardType, setCardType)
    ) {
      Animated.timing(translateX, {
        toValue: -100,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        expRef.current.focus();
      });
    }

    setCardNumber(tempState);
  };

  const onChangeExpDate = value => {
    if (value.length === 5 && value.match(/[0-9]{2}\/[0-9]{2}$/g)) {
      setExpDate(value);
      isExpValid(value) && ccvRef.current.focus();
      return;
    }

    const numericText = value.replace(/[0-9]{2}\/[0-9]{2}$/g, '');
    if (value.length > expDate.length && value.length === 2) {
      setExpDate(`${numericText}/`);
    } else if (value.length > expDate.length && value.length === 5) {
      setExpDate(`${numericText}`);
      ccvRef.current.focus();
    } else if (value.length <= expDate.length && value.length === 3) {
      setExpDate(numericText.slice(0, 2));
    } else if (value.length > expDate.length && value.length === 3) {
      setExpDate(`${numericText.slice(0, 2)}/${numericText.slice(2, 3)}`);
    } else {
      setExpDate(numericText);
    }
  };

  const onChangeCcv = value => {
    const numericText = value.replace(/[^0-9]/g, '');
    setCcv(numericText);
  };

  const onFocusCardNumber = () => {
    creditCardRef.current.flipToBack();

    Animated.timing(translateX, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => cardRef.current.focus());
  };

  const onFocusExpDate = () => {
    creditCardRef.current.flipToBack();

    Animated.timing(translateX, {
      toValue: -100,
      duration: 250,
      useNativeDriver: true,
    }).start(() => expRef.current.focus());
  };

  const onFocusCcv = () => {
    creditCardRef.current.flipToFront();
  };

  const onPressAddCard = () => {
    const cardExists = doesCardExist(credits, cardNumber, expDate, ccv);

    if (cardExists) {
      setToast({
        toastType: 'error',
        toastMessage: `You card ****${cardNumber.slice(-4)} already exists`,
      });
      return;
    }

    setCredits([
      {
        cardNumber,
        expDate,
        ccv,
        type: cardType,
      },
      ...credits,
    ]);

    onClear();

    setToast({
      toastType: 'success',
      toastMessage: `You card ****${cardNumber.slice(-4)} has been added`,
    });

    onFocusCardNumber();
  };

  const onClear = () => {
    setCardNumber('');
    setExpDate('');
    setCcv('');
    setCardType('');
  };

  const animateCardIcon = () => {
    if (!!cardType) {
      Animated.sequence([
        Animated.spring(opacity, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(opacity, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.spring(opacity, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    animateCardIcon();
  }, [cardType]);

  const isCardValid =
    isCardNumberValid(cardNumber, cardType, setCardType, false) &&
    isExpValid(expDate) &&
    isCcvValid;

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        label={'Add card'}
        leftIcon={images.chevron}
        onPressLeft={() => navigation.pop()}
        rightIcon={isCardValid && images.check}
        onPressRight={onPressAddCard}
      />

      <CreditCard
        animOpacity={opacity}
        ref={creditCardRef}
        number={cardNumber}
        ccv={ccv}
        expDate={expDate}
        cardType={cardType}
      />

      <Animated.View
        style={[styles.inputContainer, {transform: [{translateX}]}]}>
        <View style={styles.inputMargin}>
          <Text style={styles.cardInputLabel}>CARD NUMBER</Text>
          <TextInput
            autoFocus
            ref={cardRef}
            maxLength={19}
            value={cardNumber}
            autoCorrect={false}
            autoComplete={'off'}
            keyboardType="numeric"
            placeholder="1234 5678 9012 3456"
            placeholderTextColor={'rgba(0,0,0,0.25)'}
            onChangeText={onChangeCardNumber}
            onFocus={onFocusCardNumber}
            style={[
              styles.textInput,
              {
                borderBottomColor:
                  ((cardNumber.length === 18 && cardType === 'amex') ||
                    (cardNumber.length === 19 && cardType !== 'amex')) &&
                  isCardNumberValid(cardNumber, cardType, setCardType)
                    ? 'green'
                    : ((cardNumber.length === 18 && cardType === 'amex') ||
                        (cardNumber.length === 19 && cardType !== 'amex')) &&
                      !isCardNumberValid(cardNumber, cardType, setCardType)
                    ? 'tomato'
                    : 'rgba(0,0,0,0.1)',
                width: WIDTH - 72 - 76,
              },
            ]}
          />
        </View>
        <View style={styles.inputMargin}>
          <Text style={styles.cardInputLabel}>EXPIRY</Text>
          <TextInput
            ref={expRef}
            maxLength={5}
            value={expDate}
            onFocus={onFocusExpDate}
            keyboardType="numeric"
            onChangeText={onChangeExpDate}
            placeholder="MM/YY"
            placeholderTextColor={'rgba(0,0,0,0.25)'}
            style={[
              styles.textInput,
              {
                borderBottomColor: isExpValid(expDate)
                  ? 'green'
                  : !isExpValid(expDate) && expDate.length === 5
                  ? 'tomato'
                  : 'rgba(0,0,0,0.1)',
                width: 78,
              },
            ]}
          />
        </View>
        <View style={styles.inputMargin}>
          <Text style={styles.cardInputLabel}>CCV/CVC</Text>
          <TextInput
            ref={ccvRef}
            value={ccv}
            maxLength={3}
            keyboardType="numeric"
            placeholder="•••"
            onFocus={onFocusCcv}
            onChangeText={onChangeCcv}
            onSubmitEditing={() => isCardValid && onPressAddCard()}
            placeholderTextColor={'rgba(0,0,0,0.25)'}
            style={[
              styles.textInput,
              {
                width: 64,
                borderBottomColor:
                  ccv.length === 0
                    ? 'rgba(0,0,0,0.1)'
                    : isCcvValid
                    ? 'green'
                    : 'tomato',
              },
            ]}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  inputMargin: {
    marginLeft: 24,
  },
  cardInputLabel: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: colors.lightBlack,
  },
  textInput: {
    padding: 4,
    fontSize: 18,
    borderBottomWidth: 2,
  },
});

export default AddCard;
