import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, StyleSheet, Image, Pressable, Text} from 'react-native';

import images from '../assets/images';
import {colors} from '../assets/colors';
import {WIDTH} from '../assets/constants';
import {useNavigation} from '@react-navigation/native';

const MapSearch = ({onItemPress}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [address, setAddress] = useState('');

  const marginVertical = insets.bottom > 0 ? insets.bottom : 16;

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Search', {
          onItemPress,
          setAddress,
        })
      }
      style={[styles.container, {marginVertical}]}>
      <View style={styles.rowCenter}>
        <Image source={images.search} style={styles.searchIcon} />
        <Text numberOfLines={1} style={styles.input}>
          {address || 'Parking address...'}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    position: 'absolute',
    bottom: 0,
    height: 60,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  closeIcon: {
    tintColor: colors.lightBlack,
    width: 16,
    height: 16,
  },
  input: {
    top: 2,
    fontFamily: 'Poppins-Regular',
    color: 'rgba(0,0,0,0.4)',
    fontSize: 18,
    paddingLeft: 8,
  },
});

export default MapSearch;
