import './Styles/App.css';
import AppContent from "./Component/AppContent";
import {CarsContext} from "./Context/CarsContext";
import {CartContext} from "./Context/CartContext";
import {ViewContext} from "./Context/ViewContext";

function App() {
  return (
    <div className="App">
      <header data-testid="header">Auriga Chariots</header>
        <CarsContext>
            <CartContext>
                <ViewContext>
                    <AppContent />
                </ViewContext>
            </CartContext>
        </CarsContext>
    </div>
  );
}

export default App;
