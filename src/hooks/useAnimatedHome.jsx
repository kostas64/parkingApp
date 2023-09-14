import {useDrawerProgress} from '@react-navigation/drawer';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

const useAnimatedHome = () => {
  const drawerProgress = useDrawerProgress();
  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(drawerProgress.value, [0, 1], [1, 0.8]);
    const borderRadius = interpolate(drawerProgress.value, [0, 1], [0, 34]);

    return {
      borderRadius,
      transform: [{scale}],
    };
  });

  return {animatedStyles, Comp: Animated.View};
};

export default useAnimatedHome;
