import {memo} from 'react'
import {useCart} from '../Context/CartContext'
import Button from 'react-bootstrap/Button'

const CarListItem = memo(({onClick, style, ...car}) => {
    const {cart, addItem} = useCart()
    const clickHandler = () => onClick(car)
    const handleBuy = (e) => {
        e.stopPropagation()
        addItem(car)
    }

    return (
        <article data-testid="list-item" onClick={clickHandler} style={style}>
            <img src={car.image} alt={car.color}/>
            <span>{car.year} {car.make} {car.model}</span>
            {!cart.find(item => item.id === car.id) ?
                <Button variant='success' className='right-element' title="Buy" onClick={handleBuy}>Buy</Button> :
                <span className='right-element'>In Cart!</span>}
        </article>
    )
})

export default CarListItem