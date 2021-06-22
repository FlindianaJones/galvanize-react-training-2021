import { useState } from 'react';
import { useCars } from '../Context/CarsContext';
import CarListItem from './CarListItem';

const AppContent = () => {
  const [searchParams, setSearchParams] = useState({});
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(0);
  const { cars } = useCars();

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    setSearchParams({ make, model, year });
  };

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
        {(cars || [])
          .filter((car) => !searchParams.make || car.make.toLowerCase().includes(searchParams.make.toLowerCase()))
          .filter(
            (car) => !searchParams.model || car.model.toLowerCase().includes(searchParams.model.toLowerCase()) 
          )
          .filter((car) => !searchParams.year || car.year.toString().includes(searchParams.year.toString()))
          .map((car, index) => (
            <CarListItem {...car} />
          ))}
      </section>
    </>
  );
};

export default AppContent;
