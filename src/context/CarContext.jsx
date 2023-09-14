import React, {useState} from 'react';

export const CarContext = React.createContext(null);

const CarContextProvider = ({children}) => {
  const [selectedPlate, setSelectedPlate] = useState(null);

  return (
    <CarContext.Provider
      value={{
        selectedPlate,
        setSelectedPlate,
      }}>
      {children}
    </CarContext.Provider>
  );
};

export default CarContextProvider;
