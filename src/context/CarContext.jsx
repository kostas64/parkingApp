import React from 'react';
import {useMMKVStorage} from 'react-native-mmkv-storage';

import {storage} from '../../App';

export const CarContext = React.createContext(null);

const CarContextProvider = ({children}) => {
  const [plates, setPlates] = useMMKVStorage('plates', storage, []);

  return (
    <CarContext.Provider
      value={{
        plates,
        setPlates,
      }}>
      {children}
    </CarContext.Provider>
  );
};

export default CarContextProvider;
