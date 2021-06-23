const CarListItem = ({onClick, ...car}) => {
    const clickHandler = () => onClick(car)
    return (
        <article data-testid="list-item" onClick={clickHandler}>
            <img src={car.image} alt={car.color}/>
            {car.year} {car.make} {car.model}
        </article>
    )
}

export default CarListItem