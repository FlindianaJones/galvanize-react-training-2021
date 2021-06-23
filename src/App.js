import './App.css';
import AppContent from "./Component/AppContent";
import {CarsContext} from "./Context/CarsContext";
import {CartContext} from "./Context/CartContext";

function App() {
  return (
    <div className="App">
      <header data-testid="header">Auriga Chariots</header>
        <CarsContext>
            <CartContext>
                <AppContent />
            </CartContext>
        </CarsContext>
    </div>
  );
}

export default App;
