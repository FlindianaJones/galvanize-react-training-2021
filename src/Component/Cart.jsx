import {useCart} from "../Context/CartContext";
import Button from "react-bootstrap/Button";
import {useView} from "../Context/ViewContext";

const Cart = () => {
    const {cart, removeItem} = useCart()
    const [, setView] = useView()

    const backToSearch = () => {
        setView('search')
    }

    return (
        <>
            <nav>
                <Button variant='danger' title='Continue Shopping' onClick={backToSearch}>X</Button>
            </nav>
            <div>
                {cart.map(item => {
                    return (
                        <div data-testid='cart-item' className='cart-item' key={item.id}>
                            <img src={item.image} alt={`${item.color} ${item.make} ${item.model}`}/>
                            <div>
                                <h4>{item.make} {item.model}</h4>
                                <p>{item.color}, {item.year}</p>
                                <p>${item.price}</p>
                            </div>
                            <nav>
                                <Button variant='warning' title='Remove from cart' onClick={() => {
                                    removeItem(item)
                                }}>Delete</Button>
                            </nav>
                        </div>
                    )
                })}
            </div>
            <div>
                Cart Total: ${Number(cart.reduce((total, item) => total + parseFloat(item.price), 0)).toLocaleString()}
            </div>
        </>
    )
}

export default Cart