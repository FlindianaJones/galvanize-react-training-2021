import {useCart} from "../Context/CartContext";
import Button from 'react-bootstrap/Button';
import {useView} from "../Context/ViewContext";
import Search from "./Search";
import Cart from "./Cart";

const AppContent = () => {
  const { cart } = useCart();
  const [view, setView] = useView();

  const goToCart = () => {
    setView('cart')
  }

  let content = null

  switch (view) {
    case 'cart':
      content = <Cart />
      break
    default:
      content = <Search />
  }

  return (
    <>
      <nav>
        <Button variant='outline-primary' onClick={goToCart}>{cart.length === 0 ? 'Cart Empty' : `Cart (${cart.length})`}</Button>
      </nav>
      {content}
    </>
  );
};

export default AppContent;
