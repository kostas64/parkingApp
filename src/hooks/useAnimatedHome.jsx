import {useDrawerProgress} from '@react-navigation/drawer';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

import {isAndroid} from '../assets/constants';

const useAnimatedHome = () => {
  const drawerProgress = useDrawerProgress();
  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(drawerProgress.value, [0, 1], [1, 0.8]);
    const borderRadius = interpolate(
      drawerProgress.value,
      [0, 1],
      [isAndroid ? 0 : 36, isAndroid ? 36 : 46],
    );

    return {
      borderRadius,
      transform: [{scale}],
    };
  });

  const animatedRadiusStyles = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      drawerProgress.value,
      [0, 1],
      [isAndroid ? 0 : 36, isAndroid ? 36 : 46],
    );

    return {
      borderBottomLeftRadius: 36,
      borderBottomLeftRadius: 36,
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    };
  });

  return {animatedStyles, animatedRadiusStyles, Comp: Animated.View};
};

export default useAnimatedHome;
