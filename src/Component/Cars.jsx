import CarListItem from "./CarListItem";
import {useCart} from "../Context/CartContext"
import Button from "react-bootstrap/Button";

const Cars = ({cars, selectedCar, onSelect, close}) => {
    const {cart, addItem} = useCart();
    const handleBuy = () => addItem(selectedCar)

    if (!selectedCar) {
        return (
            <>
                {cars.map((car, index) => (
                    <CarListItem key={index} {...car} onClick={onSelect}/>
                ))}
            </>
        )
    } else {
        return (
            <div className='car-detail-container'>
                <nav>
                    <Button variant='danger' title='Close' onClick={close}>X</Button>
                    {!cart.find(item => item.id === selectedCar.id) ?
                    <Button variant='success' title="Buy" onClick={handleBuy}>Buy</Button> :
                    <span className='right-element'>In Cart!</span>}
                </nav>
                <div className='car-detail'>
                    <img src={selectedCar.image} alt={selectedCar.color}/>
                    <div>
                        <p>Year: {selectedCar.year}</p>
                        <p>Make: {selectedCar.make}</p>
                        <p>Model: {selectedCar.model}</p>
                        <p>Color: {selectedCar.color}</p>
                        <p>Price: ${selectedCar.price}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cars