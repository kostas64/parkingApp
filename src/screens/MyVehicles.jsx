import React, {useContext, useRef} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import images from '../assets/images';
import {colors} from '../assets/colors';
import {WIDTH} from '../assets/constants';
import Header from '../components/Header';
import Checkbox from '../components/Checkbox';
import AddPlate from '../components/AddPlate';
import {CarContext} from '../context/CarContext';
import AnimatedModal from '../components/AnimatedModal';
import InsertPlateModal from '../components/InsertPlateModal';

const MyVehicles = ({navigation}) => {
  const modalRef = useRef();
  const {plates, setPlates} = useContext(CarContext);

  const onPressSelect = index => {
    setPlates([
      ...plates?.map((plate, nestedInd) =>
        nestedInd === index
          ? {
              selected: true,
              value: plate.value,
            }
          : {
              selected: false,
              value: plate.value,
            },
      ),
    ]);
  };

  const onPressInsert = value => {
    setPlates([
      ...(!!plates ? plates : []),
      {
        selected: !plates || plates?.length === 0 ? true : false,
        value,
      },
    ]);
    modalRef.current?.closeModal();
  };

  const onPressDelete = car => {
    const filtered = [...plates?.filter(item => item.value !== car.value)];

    if (filtered.length === 1) {
      filtered[0].selected = true;
    }

    setPlates(filtered);
  };

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <Header
          label={'My vehicles'}
          leftIcon={images.chevron}
          onPressLeft={() => navigation.pop()}
          onPressRight={() => modalRef.current?.animateModal()}
          rightIcon={images.plus}
        />

        {/* List */}
        <View style={styles.listContainer}>
          {plates?.map((car, index) => (
            <React.Fragment key={index}>
              {index === 0 && <View style={styles.hr} />}
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  onPress={() => onPressSelect(index)}
                  style={styles.touchable}>
                  <Checkbox selected={car.selected} />
                  <Text style={styles.carPlate}>{car.value}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onPressDelete(car)}
                  style={{alignSelf: 'center'}}>
                  <Image source={images.trash} style={styles.trash} />
                </TouchableOpacity>
              </View>
              <View style={styles.hr} />
            </React.Fragment>
          ))}
        </View>
        {/* Insert Modal */}
        {(!plates || plates?.length === 0) && (
          <AddPlate onPress={() => modalRef.current?.animateModal()} />
        )}
      </View>

      {/* Animated Modal */}
      <AnimatedModal
        ref={modalRef}
        content={<InsertPlateModal onPress={onPressInsert} />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContainer: {
    marginTop: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  touchable: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  carPlate: {
    width: WIDTH - 90,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  trash: {
    width: 22,
    height: 22,
    tintColor: colors.yellow,
    alignSelf: 'center',
  },
  hr: {
    height: 1,
    width: '100%',
    backgroundColor: colors.lightBlack,
  },
});

export default MyVehicles;
