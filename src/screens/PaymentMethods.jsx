import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {storage} from '../../App';
import images from '../assets/images';
import Header from '../components/Header';
import Loading from '../components/Loading';
import PaymentMethodItem from '../components/PaymentMethodItem';

const PaymentMethods = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [credits, setCredits] = useMMKVStorage('credits', storage);
  const [loading, setLoading] = useState(false);

  const renderItem = ({item, index}) => (
    <PaymentMethodItem
      item={item}
      index={index}
      onDismissItem={onDismissItem}
      key={`card-${index}`}
    />
  );

  const onDismissItem = item => {
    setCredits(oldCreds =>
      oldCreds.filter(cred => cred.cardNumber !== item.cardNumber),
    );
  };

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [credits]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        label={'Payment Methods'}
        leftIcon={images.chevron}
        onPressLeft={() => navigation.pop()}
        rightIcon={images.plus}
        onPressRight={() => navigation.navigate('AddCard')}
      />

      {!loading ? (
        <FlatList
          data={credits}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: insets.bottom > 0 ? insets.bottom : 24,
          }}
        />
      ) : (
        <Loading />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default PaymentMethods;
