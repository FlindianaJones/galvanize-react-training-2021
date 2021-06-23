import CarListItem from "./CarListItem";

const Cars = ({cars, selectedCar, onSelect, close}) => {
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
                </nav>
            </div>
        )
    }
}

export default Cars