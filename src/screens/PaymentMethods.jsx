import React from 'react';
import {StyleSheet, View} from 'react-native';

import images from '../assets/images';
import Header from '../components/Header';

const PaymentMethods = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        label={'Payment Methods'}
        leftIcon={images.chevron}
        onPressLeft={() => navigation.pop()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default PaymentMethods;
