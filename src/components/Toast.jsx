import React, {useContext, useEffect, useRef} from 'react';
import {View, Text, Image, StyleSheet, Animated} from 'react-native';

import images from '../assets/images';
import {WIDTH} from '../assets/constants';
import {CarContext} from '../context/CarContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Toast = () => {
  const insets = useSafeAreaInsets();
  const {toast, setToast} = useContext(CarContext);

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const hasToast = !!toast?.toastType && !!toast?.toastMessage;

  const getTitle = () => {
    if (toast?.toastType === 'success') return 'Success';
    if (toast?.toastType === 'error') return 'Error';

    return 'Success';
  };

  const getIcon = () => {
    if (toast?.toastType === 'success') return 'thumbsUp';
    if (toast?.toastType === 'error') return 'error';

    return 'thumbsUp';
  };

  useEffect(() => {
    if (hasToast) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 25,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            delay: 2500,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            delay: 2500,
            duration: 350,
            useNativeDriver: true,
          }),
        ]).start(() => setToast({}));
      });
    }
  }, [toast]);

  return (
    <Animated.View
      style={[
        styles.container,
        hasToast && {zIndex: 1000000},
        {top: insets.top, opacity, transform: [{translateY}]},
      ]}>
      <View style={styles.titleContainer}>
        <Image source={images?.[getIcon()]} style={styles.imgContainer} />
        <Text style={styles.title}>{getTitle()}</Text>
      </View>
      <Text style={styles.description}>{toast?.toastMessage}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'white',
    width: WIDTH - 48,
    minHeight: 60,
    padding: 16,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    borderRadius: 16,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgContainer: {
    width: 24,
    height: 24,
  },
  title: {
    marginLeft: 16,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    width: WIDTH - 124,
  },
  description: {
    marginTop: 4,
    marginLeft: 40,
    fontFamily: 'Poppins-Regular',
  },
});

export default Toast;
