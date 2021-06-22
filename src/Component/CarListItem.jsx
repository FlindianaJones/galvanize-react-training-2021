
const CarListItem = ({image, color, make, model, year}) => {
  return (
    <article data-testid="list-item">
      <img src={image} alt={color} />
      {year} {make} {model}
    </article>
  )
}

export default CarListItem