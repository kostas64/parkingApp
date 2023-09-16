import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, StyleSheet, Image, Pressable, Text} from 'react-native';

import images from '../assets/images';
import {colors} from '../assets/colors';
import {isAndroid} from '../assets/constants';
import {useNavigation} from '@react-navigation/native';

const MapSearch = ({onItemPress}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const styles = customStyle(insets);
  const [address, setAddress] = useState('');

  const margin = isAndroid ? styles.marginAndroid : styles.marignIos;

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Search', {
          onItemPress,
          setAddress,
        })
      }
      style={[styles.container, margin]}>
      <View style={styles.rowCenter}>
        <Image source={images.search} style={styles.searchIcon} />
        <Text numberOfLines={1} style={styles.input}>
          {address || 'Parking address...'}
        </Text>
      </View>
    </Pressable>
  );
};

const customStyle = insets =>
  StyleSheet.create({
    container: {
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchIcon: {
      tintColor: colors.lightBlack,
      width: 28,
      height: 28,
    },
    input: {
      top: 2,
      fontFamily: 'Poppins-Regular',
      color: 'rgba(0,0,0,0.4)',
      fontSize: 18,
      paddingLeft: 8,
    },
    marginAndroid: {
      marginVertical: 6,
    },
    marignIos: {
      marginBottom: insets.bottom,
      marginTop: 8,
    },
  });

export default MapSearch;
