import React, {useContext, useRef} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import images from '../assets/images';
import {colors} from '../assets/colors';
import Checkbox from '../components/Checkbox';
import AddPlate from '../components/AddPlate';
import {CarContext} from '../context/CarContext';
import {WIDTH, isAndroid} from '../assets/constants';
import AnimatedModal from '../components/AnimatedModal';
import InsertPlateModal from '../components/InsertPlateModal';

const MyVehicles = ({navigation}) => {
  const modalRef = useRef();

  const insets = useSafeAreaInsets();
  const {plates, setPlates} = useContext(CarContext);
  const marginTop = insets.top > 0 ? insets.top + 8 : 24;

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
        <View style={[styles.header, {marginTop}]}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            hitSlop={styles.hitSlop}>
            <Image source={images.chevron} style={styles.chevron} />
          </TouchableOpacity>
          <View style={styles.labelsContainer}>
            <Text style={styles.myCarLabel}>My vehicles</Text>
          </View>
          <TouchableOpacity
            onPress={() => modalRef.current?.animateModal()}
            style={styles.add}>
            <Image source={images.plus} style={styles.cross} />
          </TouchableOpacity>
        </View>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  add: {
    backgroundColor: colors.yellow,
    padding: 8,
    borderRadius: 12,
  },
  cross: {
    width: 12,
    height: 12,
    tintColor: colors.lightBlack,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
  chevron: {
    tintColor: colors.lightBlack,
    width: 20,
    height: 20,
  },
  labelsContainer: {
    flex: 1,
    alignItems: 'center',
    top: isAndroid ? 2 : 0,
  },
  myCarLabel: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: colors.lightBlack,
  },
  hitSlop: {
    top: 20,
    left: 20,
    right: 12,
    bottom: 12,
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
