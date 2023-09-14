import React, {useEffect, useRef, useState} from 'react';
import {Text, ActivityIndicator, StyleSheet, Animated} from 'react-native';

import {colors} from '../assets/colors';

const HomeLoading = ({show}) => {
  const [showLoading, setShowLoading] = useState(true);
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: show ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setTimeout(() => setShowLoading(false), 1000));
  }, [show]);

  return (
    showLoading && (
      <Animated.View style={[styles.container, {opacity}]}>
        <ActivityIndicator size={'large'} color={colors.yellow} />
        <Text style={styles.label}>Loading parking slots...</Text>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 100000,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginTop: 16,
  },
});

export default HomeLoading;
