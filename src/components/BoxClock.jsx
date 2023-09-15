import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native';

import images from '../assets/images';
import {colors} from '../assets/colors';
import {isIOS} from '../assets/constants';

const BoxClock = ({
  hours,
  mins,
  setPrice,
  isPrivate,
  pricePerMinute,
  methodSelected,
  setMethodSelected,
}) => {
  const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0)));

  const isSelected = methodSelected === 'perHour';
  const backgroundColor = isSelected ? colors.yellow : 'white';
  const parkLabel = `Charge for\nHH${isIOS ? '       MM' : '   MM'}`;

  const onDateChange = date => {
    //Calculate cose
    const minutesCost = date.getMinutes() * pricePerMinute;
    const hoursCost = date.getHours() * 60 * pricePerMinute;

    setPrice(minutesCost + hoursCost);

    //Update state time && Method selection
    setDate(date);
    !isSelected && setMethodSelected('perHour');
  };

  useEffect(() => {
    if (isSelected && !isPrivate) {
      const minsCost = pricePerMinute * date.getMinutes();
      const hoursCost = pricePerMinute * 60 * date.getHours();

      setPrice(minsCost + hoursCost);
    }
  }, [date, methodSelected]);

  return (
    <TouchableOpacity
      onPress={() => setMethodSelected('perHour')}
      style={[styles.container, {backgroundColor}]}>
      <Image source={images.clock} style={styles.clock} />
      <Text style={styles.parkLabel}>{parkLabel}</Text>
      <DatePicker
        locale="fr"
        mode="time"
        date={date}
        is24hourSource="locale"
        style={styles.timePicker}
        androidVariant="iosClone"
        onDateChange={onDateChange}
        textColor={'black'}
        maximumDate={new Date(new Date().setHours(hours, mins, 0))}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 12},
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 5,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  clock: {
    tintColor: colors.lightBlack,
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  parkLabel: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 8,
  },
  timePicker: {
    flexGrow: 1,
    width: 100,
    height: 96,
  },
});

export default BoxClock;
