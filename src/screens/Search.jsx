import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import images from '../assets/images';
import {colors} from '../assets/colors';

const Search = ({route, navigation}) => {
  const setAddress = route?.params?.setAddress;
  const onItemPress = route?.params?.onItemPress;

  const textInputProps = {
    autoFocus: true,
    backgroundColor: colors.yellow,
    placeholderTextColor: 'rgba(0,0,0,0.5)',
  };

  return (
    <View style={styles.container}>
      {/* Close icon */}
      <TouchableOpacity
        onPress={() => navigation.pop()}
        style={styles.closeContainer}
        hitSlop={styles.hitSlop}>
        <Image source={images.close} style={styles.close} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Search parking slots around</Text>

      {/* Search */}
      <GooglePlacesAutocomplete
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
        }}
        placeholder="City, Place, Zip Code ..."
        textInputProps={textInputProps}
        fetchDetails={true}
        enablePoweredByContainer={false}
        onPress={(_, details = null) => {
          setAddress(details?.formatted_address);

          navigation.pop();

          onItemPress(
            details.geometry?.location?.lat,
            details.geometry?.location?.lng,
            0.025,
            0.025,
            2000,
          );
        }}
        query={{
          key: 'AIzaSyAjzvohgdGHwrXs5luSWvngxl3CrS4DXqQ',
          language: 'en',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.lightBlack,
  },
  textInputContainer: {
    paddingTop: 4,
    marginTop: 16,
    paddingRight: 8,
    borderColor: colors.yellow,
    backgroundColor: colors.yellow,
    borderWidth: 1,
    borderRadius: 20,
  },
  textInput: {
    paddingLeft: 16,
    borderRadius: 20,
    color: colors.lightBlack,
    fontFamily: 'Poppins-Regular',
  },

  closeContainer: {
    alignSelf: 'flex-end',
  },
  hitSlop: {
    top: 8,
    left: 8,
    bottom: 8,
    right: 8,
  },
  close: {
    width: 16,
    height: 16,
    marginBottom: 8,
  },
});

export default Search;
