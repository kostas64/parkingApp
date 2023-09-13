import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {colors} from '../assets/colors';

const Search = ({route, navigation}) => {
  const setAddress = route?.params?.setAddress;
  const onItemPress = route?.params?.onItemPress;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search parking around</Text>

      <GooglePlacesAutocomplete
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
        }}
        placeholder="Search"
        textInputProps={styles.textInputProps}
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
  textInputProps: {
    backgroundColor: colors.yellow,
    placeholderTextColor: 'rgba(0,0,0,0.5)',
  },
});

export default Search;
