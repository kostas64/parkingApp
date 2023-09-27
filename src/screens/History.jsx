import React, {useContext} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import images from '../assets/images';
import Header from '../components/Header';
import {CarContext} from '../context/CarContext';
import HistoryItem from '../components/HistoryItem';

const History = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {history} = useContext(CarContext);

  const paddingBottom = insets.bottom > 0 ? insets.bottom + 8 : 24;

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        label={'History'}
        leftIcon={images.chevron}
        onPressLeft={() => navigation.pop()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 16, paddingBottom}}>
        {history?.map((item, index) => (
          <HistoryItem key={index} index={index} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default History;
