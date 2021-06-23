import { createContext, useContext, useEffect, useState } from 'react';
import { getCars } from '../Data/cars';

const carsProvider = createContext(undefined);
export const useCars = () => useContext(carsProvider);

export const CarsContext = ({ children, value }) => {
  console.log('RENDERING CarsContext');
  const [cars, setCars] = useState(value || []);

  useEffect(() => {
    if (!value) {
      getCars().then((cars) => {
        setCars(cars);
      });
    }
  }, [value]);

  return (
    <carsProvider.Provider value={{ cars }}>{children}</carsProvider.Provider>
  );
};
