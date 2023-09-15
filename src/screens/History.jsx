import React from 'react';
import {StyleSheet, View} from 'react-native';

import images from '../assets/images';
import Header from '../components/Header';

const History = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        label={'History'}
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

export default History;
