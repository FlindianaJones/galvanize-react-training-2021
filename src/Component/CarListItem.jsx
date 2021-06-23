import {useCart} from '../Context/CartContext'

const CarListItem = ({onClick, ...car}) => {
    const {cart, addItem} = useCart()
    const clickHandler = () => onClick(car)
    const handleBuy = (e) => {
        e.stopPropagation()
        addItem(car)
    }

    return (
        <article data-testid="list-item" onClick={clickHandler}>
            <img src={car.image} alt={car.color}/>
            {car.year} {car.make} {car.model}
            {!cart.find(item => item.id === car.id) && <button title="Buy" onClick={handleBuy}>Buy</button>}
        </article>
    )
}

export default CarListItem