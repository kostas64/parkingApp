import React, {useEffect, useRef} from 'react';
import {Animated, Platform, StatusBar} from 'react-native';

import images from '../assets/images';
import {colors} from '../assets/colors';
import {HEIGHT} from '../assets/constants';

const AnimatedBootsplash = ({onAnimationEnd}) => {
  const opacity = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animateIOS = () => {
    Animated.stagger(350, [
      Animated.spring(translateY, {
        toValue: -50,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: HEIGHT,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      delay: 400,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      onAnimationEnd();
    }, 400);
  };

  const animateAndroid = () => {
    Animated.stagger(350, [
      Animated.spring(translateY, {
        toValue: -50,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: HEIGHT,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(opacity, {
      toValue: 0,
      duration: 150,
      delay: 350,
      useNativeDriver: true,
    }).start(() => {
      onAnimationEnd();
    });
  };

  useEffect(() => {
    setTimeout(() => {
      Platform.OS === 'ios' ? animateIOS() : animateAndroid();
    }, 250);
  }, []);

  return (
    <Animated.View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.yellow,
        opacity,
      }}>
      <Animated.Image
        source={images.logo}
        style={{
          width: 100,
          height: 100,
          top: +StatusBar.currentHeight,
          alignSelf: 'center',
          transform: [{translateY}],
        }}
      />
    </Animated.View>
  );
};

export default AnimatedBootsplash;
