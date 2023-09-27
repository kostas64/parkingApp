import Animated, {
  withRepeat,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import {colors} from '../assets/colors';
import {WIDTH} from '../assets/constants';
import {formatDate} from '../utils/DateUtils';
import {CarContext} from '../context/CarContext';

const HistoryItem = ({item, index}) => {
  const scaleDot = useSharedValue(0.9);

  const {history} = useContext(CarContext);

  const isActive = new Date(item.parkUntil) > new Date();
  const opacity = isActive ? 1 : 0.4;

  const dotStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scaleDot.value}],
    };
  });

  useEffect(() => {
    scaleDot.value = withRepeat(
      withTiming(1.2, {
        duration: 1000,
      }),
      0,
      true,
    );
  }, []);

  return (
    <>
      <View style={styles.itemContainer}>
        <Image source={item.img} style={[styles.img, {opacity}]} />
        {isActive && <Animated.View style={[styles.activeDot, dotStyle]} />}
        <View style={styles.flexBetween}>
          <View>
            <Text style={styles.name}>{item.parkName}</Text>
            <Text style={styles.address}>{item.address}</Text>
            <View style={styles.margin}>
              <Text>
                <Text
                  style={[
                    styles.timeStamp,
                    {fontFamily: 'Poppins-SemiBold'},
                  ]}>{`From `}</Text>
                <Text style={styles.timeStamp}>{`${formatDate(
                  new Date(item?.parkFrom),
                )}`}</Text>
              </Text>
              <Text>
                <Text
                  style={[
                    styles.timeStamp,
                    {fontFamily: 'Poppins-SemiBold'},
                  ]}>{`To `}</Text>
                <Text style={styles.timeStamp}>{`${formatDate(
                  new Date(item?.parkUntil),
                )}`}</Text>
              </Text>
              <Text>
                <Text
                  style={[
                    styles.timeStamp,
                    {fontFamily: 'Poppins-SemiBold'},
                  ]}>{`License plate `}</Text>
                <Text style={styles.timeStamp}>{`${item.plate}`}</Text>
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.fee}>{`$${item.fee}`}</Text>
      </View>
      {index !== history.length - 1 && <View style={styles.hr} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  flexBetween: {
    flex: 1,
    justifyContent: 'space-between',
  },
  img: {
    width: 96,
    height: 96,
    borderRadius: 24,
    marginRight: 16,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    color: colors.lightBlack,
    fontSize: 18,
    fontWeight: '700',
  },
  address: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    width: WIDTH - 96 - 96,
    color: 'rgba(0,0,0,0.5)',
  },
  fee: {
    color: colors.lightBlack,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    alignSelf: 'flex-end',
  },
  timeStamp: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    width: WIDTH - 96 - 96,
    color: colors.lightBlack,
  },
  hr: {
    height: 2,
    width: WIDTH - 36,
    backgroundColor: colors.yellow,
    alignSelf: 'center',
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  margin: {
    marginTop: 12,
  },
  activeDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    left: 96,
    top: 86,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: '#1db450',
  },
});

export default HistoryItem;
