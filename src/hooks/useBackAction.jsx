import React from 'react';
import {BackHandler} from 'react-native';

const useBackAction = custonBackAction => {
  React.useEffect(() => {
    const backAction = () => {
      !!custonBackAction && custonBackAction();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
};

export default useBackAction;
