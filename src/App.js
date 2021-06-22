import './App.css';
import AppContent from "./Component/AppContent";
import {CarsContext} from "./Context/CarsContext";

function App() {
  return (
    <div className="App">
      <header data-testid="header">Auriga Chariots</header>
        <CarsContext>
            <AppContent />
        </CarsContext>
    </div>
  );
}

export default App;
