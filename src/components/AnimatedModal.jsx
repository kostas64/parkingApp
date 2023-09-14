import {Image, Animated, Pressable, StyleSheet} from 'react-native';
import React, {useImperativeHandle, useRef, useState} from 'react';

import images from '../assets/images';
import {colors} from '../assets/colors';
import {HEIGHT} from '../assets/constants';

const AnimatedModal = React.forwardRef(({content}, ref) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const [isAnimating, setIsAnimating] = useState(false);

  const animateModal = reverse => {
    setIsAnimating(true);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: reverse ? 0 : 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: reverse ? 0 : -100,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => reverse && setIsAnimating(false));
  };

  const closeModal = () => animateModal(true);

  //Export animation trigger function
  useImperativeHandle(ref, () => ({
    animateModal,
    closeModal,
  }));

  const top =
    HEIGHT > 800
      ? 320
      : HEIGHT > 700
      ? 250
      : HEIGHT > 600
      ? 200
      : HEIGHT > 500
      ? 150
      : 100;
  const Wrapper = isAnimating ? Pressable : React.Fragment;

  return (
    isAnimating && (
      <Wrapper style={[styles.container]} onPress={closeModal}>
        <Animated.View
          style={[
            styles.innerAnimated,
            {top, opacity, transform: [{translateY}]},
          ]}>
          {/* Close button */}
          <Pressable onPress={closeModal}>
            <Image source={images.close} style={styles.close} />
          </Pressable>

          {/* Modal content */}
          {content}
        </Animated.View>
      </Wrapper>
    )
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    zIndex: 10000,
  },
  innerAnimated: {
    marginHorizontal: 16,
    borderRadius: 32,
    paddingTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: 'white',
  },
  close: {
    tintColor: colors.lightBlack,
    alignSelf: 'flex-end',
    right: 8,
    width: 12,
    height: 12,
    marginBottom: 4,
  },
});

export default React.memo(AnimatedModal);
