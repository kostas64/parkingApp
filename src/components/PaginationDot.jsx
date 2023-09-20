import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {colors} from '../assets/colors';
import {WIDTH} from '../assets/constants';

const PaginationDot = ({x, index}) => {
  const rDotStyle = useAnimatedStyle(() => {
    const width = interpolate(
      x.value,
      [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
      [12, 24, 12],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      x.value,
      [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
      [0.35, 1, 0.35],
      Extrapolate.CLAMP,
    );
    return {
      width,
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        rDotStyle,
        {
          margin: 6,
          height: 12,
          borderRadius: 6,
          backgroundColor: colors.lightBlack,
        },
      ]}
    />
  );
};

export default PaginationDot;
