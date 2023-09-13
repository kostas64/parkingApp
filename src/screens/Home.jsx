import MapView, {Marker} from 'react-native-maps';
import {Animated, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {markers} from '../assets/markers';
import {HEIGHT} from '../assets/constants';
import {mapStyle} from '../assets/mapStyle';
import CarPlate from '../components/CarPlate';
import MapSearch from '../components/MapSearch';
import MenuButton from '../components/MenuButton';
import PriceMarker from '../components/PriceMarker';
import ActiveMarker from '../components/ActiveMarker';
import ParkingModal from '../components/ParkingModal';
import MapParkingCard from '../components/MapParkingCard';
import CustomBottomSheet from '../components/CustomBottomSheet';

const Home = () => {
  const initialRegion = {
    latitude: 38.02880033857324,
    longitude: 23.775522890021665,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const mapRef = useRef();
  const bottomSheetRef = useRef(null);

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
  const [modalContent, setModalContent] = useState(null);

  const marginVertical = insets.bottom > 0 ? insets.bottom : 16;
  const snapPoints = ((HEIGHT - insets.top) / HEIGHT) * 100;

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
    animateMapCoords(markers?.[index]?.latitude, markers?.[index]?.longitude);

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

  const animateMapCoords = (
    latitude,
    longitude,
    latitudeDelta = 0.005,
    longitudeDelta = 0.005,
    duration = 500,
  ) => {
    mapRef.current?.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      },
      duration,
    );
  };

  const onCloseBottomSheet = useCallback(() => {
    setModalContent(null);
    !!bottomSheetRef?.current && bottomSheetRef?.current?.close();
  }, []);

  useEffect(() => {
    if (selectedSlot) {
      startAnimation(selectedSlot);
    } else {
      startAnimation(0);
    }
  }, [selectedSlot]);

  useEffect(() => {
    if (modalContent) {
      bottomSheetRef.current.expand();
    }
  }, [modalContent]);

  return (
    <View style={styles.container}>
      <View
        style={[styles.mapContainer, {height: HEIGHT - 70 - marginVertical}]}>
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
                style={index === selectedSlot && {zIndex: 10000}}
                onPress={() => setSelectedSlot(index)}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}>
                <PriceMarker
                  price={marker?.costPerHour}
                  opacity={opacityBlackRefs.current?.[index]}
                />
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
          openModal={() =>
            setModalContent(<ParkingModal item={markers?.[selectedSlot]} />)
          }
          max={markers?.length}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />
      </View>
      <MapSearch onItemPress={animateMapCoords} />
      <CustomBottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        modalContent={modalContent}
        onCloseBottomSheet={onCloseBottomSheet}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mapContainer: {
    alignSelf: 'center',
    borderBottomLeftRadius: 48,
    borderBottomRightRadius: 48,
    overflow: 'hidden',
    width: '100%',
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
