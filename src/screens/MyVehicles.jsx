import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useRef, useState} from 'react';

import images from '../assets/images';
import {colors} from '../assets/colors';
import {WIDTH} from '../assets/constants';
import Header from '../components/Header';
import Checkbox from '../components/Checkbox';
import AddPlate from '../components/AddPlate';
import {CarContext} from '../context/CarContext';
import AnimatedModal from '../components/AnimatedModal';
import InsertPlateModal from '../components/InsertPlateModal';
import DeletePlateModal from '../components/DeletePlateModal';

const MyVehicles = ({navigation}) => {
  const modalRef = useRef();
  const {plates, setPlates} = useContext(CarContext);
  const [modalContent, setModalContent] = useState(null);

  const setModal = (type, plate) => {
    if (type === 'delete') {
      setModalContent(
        <DeletePlateModal
          plate={plate}
          onPressDelete={() => {
            onPressDelete(plate);
            modalRef?.current?.closeModal();
          }}
          onPressCancel={() => modalRef?.current?.closeModal()}
        />,
      );
      modalRef.current?.animateModal();
    } else if (type === 'insert') {
      setModalContent(<InsertPlateModal onPress={onPressInsert} />);
      modalRef.current?.animateModal();
    }
  };

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

  const ListWrapper = plates?.length > 0 ? ScrollView : View;

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <Header
          label={'My vehicles'}
          leftIcon={images.chevron}
          onPressLeft={() => navigation.pop()}
          onPressRight={() => setModal('insert')}
          rightIcon={images.plus}
        />

        {/* List */}
        <ListWrapper>
          {plates?.map((car, index) => (
            <React.Fragment key={index}>
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  onPress={() => onPressSelect(index)}
                  style={styles.touchable}>
                  <Checkbox selected={car.selected} />
                  <Text style={styles.carPlate}>{car.value}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModal('delete', car)}
                  style={{alignSelf: 'center'}}>
                  <Image source={images.trash} style={styles.trash} />
                </TouchableOpacity>
              </View>
              {<View style={styles.hr} />}
            </React.Fragment>
          ))}
        </ListWrapper>
        {/* Insert Modal */}
        {(!plates || plates?.length === 0) && (
          <AddPlate onPress={() => setModal('insert')} />
        )}
      </View>

      {/* Animated Modal */}
      <AnimatedModal ref={modalRef} content={modalContent} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    top: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
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
    height: 2,
    width: '100%',
    backgroundColor: colors.yellow,
  },
});

export default MyVehicles;
