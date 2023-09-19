import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import {colors} from '../assets/colors';

const Loading = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color={colors.yellow} size={'large'} />
    </View>
  );
};

export default Loading;
