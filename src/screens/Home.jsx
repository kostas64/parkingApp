import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {HEIGHT} from '../assets/constants';
import MapSearch from '../components/MapSearch';
import {mapStyle} from '../assets/maps/mapStyle';
import ActiveMarker from '../components/ActiveMarker';
import PriceMarker from '../components/PriceMarker';

const Home = () => {
  const insets = useSafeAreaInsets();
  const marginVertical = insets.top > 0 ? insets.top : 24;

  return (
    <View style={styles.container}>
      <MapSearch />
      <View
        style={[styles.mapContainer, {height: HEIGHT - 60 - marginVertical}]}>
        <MapView
          //   onMapLoaded={() => console.log('Loaded')}
          provider={'google'}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: 38.02955333857324,
            longitude: 23.775922890021665,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          maxZoomLevel={17}
          minZoomLevel={15}
          style={styles.mapStyle}>
          <Marker
            coordinate={{
              latitude: 38.02955333857324,
              longitude: 23.775922890021665,
            }}>
            <ActiveMarker />
            {/* <PriceMarker /> */}
          </Marker>
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mapContainer: {
    position: 'absolute',
    alignSelf: 'center',
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    overflow: 'hidden',
    width: '100%',
    bottom: 0,
  },
  mapStyle: {
    height: '110%',
    width: '100%',
    borderRadius: 48,
  },
});

export default Home;
