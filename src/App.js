import { useState } from 'react';
import './App.css';

const cars = [
  { make: 'Toyoda', model: 'Five Runner', year: 2002 },
  { make: 'Rhonda', model: 'Civil', year: 1989 },
  { make: 'Afford', model: 'S Court', year: 2010 },
  { make: 'Heavy', model: 'Hevvelle', year: 1993 },
  { make: 'Avoid', model: 'Pram', year: 2020 },
];

function App() {
  const [searchParams, setSearchParams] = useState({});
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    setSearchParams({ make, model, year });
  };

  return (
    <div className="App">
      <header data-testid="header">Auriga Chariots</header>
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
      {cars
        .filter((car) => !searchParams.make || car.make === searchParams.make)
        .filter(
          (car) => !searchParams.model || car.model === searchParams.model
        )
        .filter((car) => !searchParams.year || car.year === searchParams.year)
        .map((car, index) => (
          <li key={`list-item-${index}`} data-testid="list-item">
            {car.year} {car.make} {car.model}
          </li>
        ))}
    </div>
  );
}

export default App;
