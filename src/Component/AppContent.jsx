import {useCart} from "../Context/CartContext";
import Button from 'react-bootstrap/Button';
import {useView} from "../Context/ViewContext";
import Search from "./Search";
import Cart from "./Cart";
import Feedback from "./Feedback";

const AppContent = () => {
  const { cart } = useCart();
  const [view, setView] = useView();

  const goToCart = () => {
    setView('cart')
  }

  const goToFeedback = () => {
    setView('feedback')
  }

  let content = null

  switch (view) {
    case 'feedback':
      content = <Feedback />
      break
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
        <Button variant='outline-warning' onClick={goToFeedback}>Leave Feedback</Button>
      </nav>
      {content}
    </>
  );
};

export default AppContent;
