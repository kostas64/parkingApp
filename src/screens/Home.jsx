import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Animated, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {markers} from '../assets/markers';
import {HEIGHT} from '../assets/constants';
import {mapStyle} from '../assets/mapStyle';
import CarPlate from '../components/CarPlate';
import MapSearch from '../components/MapSearch';
import MenuButton from '../components/MenuButton';
import PriceMarker from '../components/PriceMarker';
import ActiveMarker from '../components/ActiveMarker';
import MapParkingCard from '../components/MapParkingCard';

const Home = () => {
  const initialRegion = {
    latitude: 38.02880033857324,
    longitude: 23.775522890021665,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const mapRef = useRef();

  const scaleRefs = useRef(
    Array.from({length: markers?.length}, () => new Animated.Value(0)),
  );

  const opacityBlackRefs = useRef(
    Array.from({length: markers.length}, () => new Animated.Value(1)),
  );

  const opacityYellowRefs = useRef(
    Array.from({length: markers.length}, () => new Animated.Value(0)),
  );

  const insets = useSafeAreaInsets();
  const [selectedSlot, setSelectedSlot] = useState(0);
  const marginVertical = insets.top > 0 ? insets.top : 24;

  const startAnimation = index => {
    //Check for already selected slots
    opacityBlackRefs.current.map((item, index) => {
      if (item.__getValue() === 1) {
        Animated.timing(opacityBlackRefs.current?.[index], {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }).start();
        Animated.timing(opacityYellowRefs.current?.[index], {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start();
        Animated.timing(scaleRefs.current?.[index], {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start();
      }
    });

    //Animate map to new selection
    mapRef.current?.animateToRegion(
      {
        latitude: markers?.[index]?.latitude,
        longitude: markers?.[index]?.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      500,
    );

    //Animate icon selected
    Animated.timing(opacityBlackRefs.current?.[index], {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacityYellowRefs.current?.[index], {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.spring(scaleRefs.current?.[index], {
      toValue: 1.18,
      damping: 11,
      stiffness: 120,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (selectedSlot) {
      startAnimation(selectedSlot);
    } else {
      startAnimation(0);
    }
  }, [selectedSlot]);

  return (
    <View style={styles.container}>
      <MapSearch />
      <View
        style={[styles.mapContainer, {height: HEIGHT - 60 - marginVertical}]}>
        <MenuButton />
        <CarPlate />
        <MapView
          ref={mapRef}
          moveOnMarkerPress={false}
          provider={'google'}
          customMapStyle={mapStyle}
          initialRegion={initialRegion}
          maxZoomLevel={17}
          minZoomLevel={15}
          style={styles.mapStyle}>
          {markers.map((marker, index) => {
            return (
              <Marker
                key={index}
                onPress={() => setSelectedSlot(index)}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}>
                <PriceMarker opacity={opacityBlackRefs.current?.[index]} />
                <View style={styles.activaMarkerContainer}>
                  <ActiveMarker
                    opacity={opacityYellowRefs.current?.[index]}
                    scale={scaleRefs.current?.[index]}
                  />
                </View>
              </Marker>
            );
          })}
        </MapView>
        <MapParkingCard
          max={markers?.length}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />
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
  activaMarkerContainer: {
    position: 'absolute',
    transform: [{scale: 0.85}],
  },
});

export default Home;
