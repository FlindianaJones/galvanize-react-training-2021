import CarListItem from "./CarListItem";
import {useCart} from "../Context/CartContext"

const Cars = ({cars, selectedCar, onSelect, close}) => {
    const {cart, addItem} = useCart();
    const handleBuy = () => addItem(selectedCar)

    if(!selectedCar) {
        return (
            <>
                {cars.map((car, index) => (
                    <CarListItem key={index} {...car} onClick={onSelect} />
                ))}
            </>
        )
    } else {
        return (
            <div>
                <div>
                    <img src={selectedCar.image} alt={selectedCar.color} />
                    {selectedCar.year} {selectedCar.make} {selectedCar.model}
                    Price: ${selectedCar.price}
                </div>
                <nav>
                    <button title='Close' onClick={close}>X</button>
                    {!cart.find(item => item.id === selectedCar.id) && <button title="Buy" onClick={handleBuy}>Buy</button>}
                </nav>
            </div>
        )
    }
}

export default Cars