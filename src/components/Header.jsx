import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

import {colors} from '../assets/colors';
import {isAndroid} from '../assets/constants';

const Header = ({
  label,
  leftIcon,
  leftIconStyle,
  leftIconContainerStyle,
  rightIcon,
  rightIconStyle,
  rightIconContainerStyle,
  onPressLeft,
  onPressRight,
}) => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top + 16 : 24;

  return (
    <View style={[styles.header, {paddingTop}]}>
      {!!leftIcon && !!onPressLeft && (
        <TouchableOpacity
          style={leftIconContainerStyle}
          onPress={onPressLeft}
          hitSlop={styles.hitSlop}>
          <Image source={leftIcon} style={[styles.leftIcon, leftIconStyle]} />
        </TouchableOpacity>
      )}
      <View style={styles.labelsContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      {!!rightIcon && !!onPressRight && (
        <TouchableOpacity
          onPress={onPressRight}
          style={[styles.rightContainer, rightIconContainerStyle]}>
          <Image
            source={rightIcon}
            style={[styles.rightIcon, rightIconStyle]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: colors.yellow,
  },
  hitSlop: {
    top: 20,
    left: 20,
    right: 12,
    bottom: 12,
  },
  leftIcon: {
    tintColor: colors.lightBlack,
    width: 20,
    height: 20,
  },
  rightContainer: {
    backgroundColor: colors.lightBlack,
    padding: 8,
    borderRadius: 12,
  },
  rightIcon: {
    width: 12,
    height: 12,
    tintColor: colors.yellow,
  },
  labelsContainer: {
    flex: 1,
    alignItems: 'center',
    top: isAndroid ? 2 : 0,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: colors.lightBlack,
  },
});

export default Header;
