import CarListItem from "./CarListItem";
import {useCart} from "../Context/CartContext"
import Button from "react-bootstrap/Button";
import {FixedSizeList} from "react-window";
import {useCallback} from "react";
import useWindowDimensions from "../Utility/WindowDimensions";

const Cars = ({cars, selectedCar, onSelect, close}) => {
    const {cart, addItem} = useCart();
    const handleBuy = () => addItem(selectedCar)
    const { height, width } = useWindowDimensions()

    const Row = useCallback(({index, style}) => { return (<CarListItem key={index} {...cars[index]} onClick={onSelect} style={style}/>) }, [cars, onSelect])

    if (!selectedCar) {
        return (
            <FixedSizeList height={height - 420} width={width * 0.9} itemSize={100} itemCount={cars.length} className='no-scrollbars'>
                {Row}
            </FixedSizeList>
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