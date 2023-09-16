import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Button from './Button';
import {colors} from '../assets/colors';
import {WIDTH} from '../assets/constants';

const DeletePlateModal = ({onPressDelete, onPressCancel, plate}) => {
  return (
    <>
      <Text style={styles.textContainer}>
        <Text style={styles.deleteLabel}>
          Do you want to delete license plate with number
        </Text>
        <Text style={[styles.deleteLabel, styles.boldLabel]}>
          {` ${plate?.value}`}
        </Text>
        <Text style={styles.deleteLabel}>?</Text>
      </Text>
      <View style={styles.buttonsContainer}>
        <Button
          label={'Delete'}
          onPress={onPressDelete}
          containerStyle={styles.deleteButton}
        />
        <Button
          label={'Cancel'}
          onPress={onPressCancel}
          containerStyle={styles.cancelButton}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 16,
    paddingRight: 2,
  },
  deleteLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.lightBlack,
  },
  boldLabel: {
    letterSpacing: 2,
    fontFamily: 'Poppins-SemiBold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  deleteButton: {
    width: (WIDTH - 72) / 2 - 4,
  },
  cancelButton: {
    width: (WIDTH - 72) / 2 - 4,
    borderColor: colors.yellow,
    borderWidth: 2,
    backgroundColor: 'white',
  },
});

export default DeletePlateModal;
