import {useEffect, useState} from 'react';
import { useCars } from '../Context/CarsContext';
import CarListItem from './CarListItem';
import Cars from "./Cars";

const AppContent = () => {
  const [searchParams, setSearchParams] = useState({});
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(0);
  const { cars } = useCars();
  const [filteredCars, setFilteredCars] = useState(cars);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    setSearchParams({ make, model, year });
  };

  const handleSelect = (car) => {
    setSelectedCar(car)
  }

  const handleUnSelect = () => {
    setSelectedCar(null)
  }

  useEffect(() => {
    let newCars = cars || []
    if(searchParams.make) {
      newCars = newCars.filter(car => car.make.toLowerCase().includes(searchParams.make.toLowerCase()))
    }
    if(searchParams.model) {
      newCars = newCars.filter(car => car.model.toLowerCase().includes(searchParams.model.toLowerCase()))
    }
    if(searchParams.year) {
      newCars = newCars.filter(car => car.year.toString().includes(searchParams.year.toString()))
    }
    setFilteredCars(newCars)
    setSelectedCar(null)
  }, [cars, searchParams])

  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <label>
          Make:
          <input
            data-testid="make-search"
            name="make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
        </label>
        <label>
          Model:
          <input
            data-testid="model-search"
            name="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </label>
        <label>
          Year:
          <input
            data-testid="year-search"
            name="year"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value, 10) || 0)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      <section>
        <Cars cars={filteredCars} selectedCar={selectedCar} onSelect={handleSelect} close={handleUnSelect} />
      </section>
    </>
  );
};

export default AppContent;
