import React, {useState} from 'react';
import {useMMKVStorage} from 'react-native-mmkv-storage';

import {storage} from '../../App';
import Toast from '../components/Toast';

export const CarContext = React.createContext(null);

const CarContextProvider = ({children}) => {
  const [toast, setToast] = useState(null);
  const [plates, setPlates] = useMMKVStorage('plates', storage, []);
  const [credits, setCredits] = useMMKVStorage('credits', storage, []);

  return (
    <CarContext.Provider
      value={{
        plates,
        setPlates,
        credits,
        setCredits,
        toast,
        setToast,
      }}>
      <Toast />
      {children}
    </CarContext.Provider>
  );
};

export default CarContextProvider;
