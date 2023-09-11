import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, StyleSheet, Image, TextInput, Pressable} from 'react-native';

import images from '../assets/images';
import {colors} from '../assets/colors';

const MapSearch = () => {
  const [input, setInput] = useState('');

  const insets = useSafeAreaInsets();
  const marginVertical = insets.top > 0 ? insets.top : 24;

  return (
    <View
      style={[
        styles.container,
        {
          marginVertical,
        },
      ]}>
      <View style={styles.rowCenter}>
        <Image source={images.search} style={styles.searchIcon} />
        <TextInput
          value={input}
          onChangeText={setInput}
          style={styles.input}
          placeholder="Parking address..."
          placeholderTextColor={'rgba(0,0,0,0.35)'}
        />
      </View>
      <Pressable onPress={() => setInput('')}>
        <Image source={images.close} style={styles.closeIcon} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
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
    fontSize: 16,
    paddingLeft: 16,
  },
});

export default MapSearch;
