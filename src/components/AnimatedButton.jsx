import Animated, {
  withSpring,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import images from '../assets/images';
import {colors} from '../assets/colors';

const AnimatedButton = ({flatListIndex, flatListRef, dataLength, onPress}) => {
  const onPressButton = () => {
    if (flatListIndex.value === dataLength - 1) {
      onPress();
    } else {
      flatListRef.current.scrollToIndex({index: flatListIndex.value + 1});
    }
  };

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(160)
          : withSpring(56),
    };
  });

  const rImageStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {rotate: '180deg'},
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withSpring(100)
              : withSpring(0),
        },
      ],
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX:
            flatListIndex.value !== dataLength - 1
              ? withSpring(-100)
              : withSpring(0),
        },
      ],
    };
  });

  return (
    <TouchableOpacity onPress={onPressButton}>
      <Animated.View style={[rContainerStyle, styles.container]}>
        <Animated.Text style={[rTextStyle, styles.getStartedLabel]}>
          Get started
        </Animated.Text>
        <Animated.Image
          source={images.chevron}
          style={[rImageStyle, styles.chevron]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: colors.lightBlack,
    padding: 12,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  getStartedLabel: {
    position: 'absolute',
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: 'white',
  },
  chevron: {
    position: 'absolute',
    width: 24,
    height: 24,
    left: 18,
    tintColor: 'white',
  },
});

export default AnimatedButton;
