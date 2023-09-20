import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {colors} from '../assets/colors';
import {WIDTH} from '../assets/constants';

const OnboardingItem = ({x, item, index}) => {
  const rContainerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      x.value,
      [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
    };
  });

  const rTranslateY = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,

      [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
      [80, 0, 80],
      Extrapolate.CLAMP,
    );
    return {
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  return (
    <Animated.View key={index} style={[styles.itemContainer, rContainerStyle]}>
      <Animated.Image source={item.img} style={[styles.image, rTranslateY]} />
      <Animated.View style={[styles.center, rTranslateY]}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  itemContainer: {
    flex: 1,
    width: WIDTH,
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'space-around',
  },
  image: {
    width: WIDTH * 0.5,
    height: WIDTH * 0.5,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: colors.lightBlack,
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    width: 260,
    color: colors.lightBlack,
  },
});

export default OnboardingItem;
