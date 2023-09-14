import React, {useContext} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import images from '../assets/images';
import {colors} from '../assets/colors';
import {WIDTH} from '../assets/constants';
import Checkbox from '../components/Checkbox';
import {CarContext} from '../context/CarContext';

const MyCar = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {selectedPlate, setSelectedPlate} = useContext(CarContext);
  const paddingTop = insets.top > 0 ? insets.top + 8 : 24;

  const cars = ['NIN-7139', 'NKY-3148', 'YHA-9282'];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.pop()}
        hitSlop={styles.hitSlop}
        style={[styles.headerCoontainer, {paddingTop}]}>
        <Image source={images.chevron} style={styles.chevron} />
        <View style={styles.labelsContainer}>
          <Text style={styles.myCarLabel}>My cars</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.listContainer}>
        {cars.map((car, index) => (
          <React.Fragment key={index}>
            <View style={styles.itemContainer}>
              <TouchableOpacity
                onPress={() => setSelectedPlate(car)}
                style={styles.touchable}>
                <Checkbox selected={selectedPlate === car} />
                <Text style={styles.carPlate}>{car}</Text>
              </TouchableOpacity>
              <Image source={images.trash} style={styles.trash} />
            </View>
            {index !== cars.length - 1 && <View style={styles.hr} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
  headerCoontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  chevron: {
    tintColor: colors.lightBlack,
    width: 20,
    height: 20,
  },
  labelsContainer: {
    paddingLeft: 12,
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

export default MyCar;
