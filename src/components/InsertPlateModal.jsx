import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import Button from './Button';
import {colors} from '../assets/colors';
import {isIOS} from '../assets/constants';

const InsertPlateModal = ({onPress}) => {
  const [input, setInput] = useState('');

  return (
    <>
      <Text style={styles.insertLabel}>Insert your vehicle's plate</Text>
      <TextInput
        value={input}
        onChangeText={value => setInput(value.toUpperCase())}
        maxLength={10}
        autoFocus
        placeholder="Plate number"
        keyboardType={isIOS ? 'default' : 'visible-password'}
        placeholderTextColor={'rgba(0,0,0,0.4)'}
        style={styles.input}
      />
      <View style={{alignSelf: 'center'}}>
        <Button
          isDisabled={input.length < 7}
          label={'Insert'}
          onPress={() => onPress(input)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  insertLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.lightBlack,
  },
  input: {
    marginVertical: 16,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: colors.yellow,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
});

export default InsertPlateModal;
