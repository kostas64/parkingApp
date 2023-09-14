import React, {useState} from 'react';
import {useMMKVStorage} from 'react-native-mmkv-storage';

import {storage} from '../../App';

export const CarContext = React.createContext(null);

const CarContextProvider = ({children}) => {
  const [plates, setPlates] = useMMKVStorage('plates', storage, null);
  const [selectedPlate, setSelectedPlate] = useState(null);

  return (
    <CarContext.Provider
      value={{
        plates,
        setPlates,
        selectedPlate,
        setSelectedPlate,
      }}>
      {children}
    </CarContext.Provider>
  );
};

export default CarContextProvider;
