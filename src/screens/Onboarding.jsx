import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {storage} from '../../App';
import {colors} from '../assets/colors';
import {WIDTH} from '../assets/constants';
import SkipButton from '../components/SkipButton';
import {onboardingSteps} from '../assets/onboarding';
import PaginationDot from '../components/PaginationDot';
import AnimatedButton from '../components/AnimatedButton';
import OnboardingItem from '../components/OnboardingItem';

const Onboarding = () => {
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue();

  const insets = useSafeAreaInsets();
  const flatListRef = useAnimatedRef();

  const [_, setOnboardingSeen] = useMMKVStorage('onboarding', storage, false);

  const Pagination = () => {
    return (
      <View style={styles.row}>
        {onboardingSteps?.map((_, index) => {
          return <PaginationDot x={x} key={index} index={index} />;
        })}
      </View>
    );
  };

  const onViewableItemsChanged = ({viewableItems}) => {
    flatListIndex.value = viewableItems?.[0]?.index;
  };

  const onScroll = useAnimatedScrollHandler(e => {
    x.value = e.contentOffset.x;
  });

  const renderItem = ({item, index}) => (
    <OnboardingItem item={item} index={index} x={x} />
  );

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top > 0 ? insets.top + 8 : 24,
          paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 24,
        },
      ]}>
      {/* Skip */}
      <SkipButton onPress={() => setOnboardingSeen(true)} />

      {/* List */}
      <Animated.FlatList
        ref={flatListRef}
        data={onboardingSteps}
        horizontal
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        onScroll={onScroll}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />

      {/* Pagination & Button */}
      <View style={styles.footerContainer}>
        <Pagination />
        <AnimatedButton
          onPress={() => setOnboardingSeen(true)}
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={onboardingSteps?.length}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: colors.yellow,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: WIDTH * 0.1,
  },
});

export default Onboarding;
