const cars = ['car 1', 'car 2', 'car 3', 'car 4', 'car 5'];
function App() {
  return (
    <div className="App">
      <header data-testid="header">Auriga Car Company</header>
      {cars.map((car, index) => (
        <li key={`list-item-${index}`} data-testid="list-item">
          {car}
        </li>
      ))}
    </div>
  );
}

export default App;
