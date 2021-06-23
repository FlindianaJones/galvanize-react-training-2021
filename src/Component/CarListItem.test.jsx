import {fireEvent, render, screen} from '@testing-library/react';
import CarListItem from './CarListItem';
import {CartContext} from '../Context/CartContext'

describe('Car List Item', () => {

  const renderCarListItem = (car, onClick) => {
    render(
      <CartContext>
        <CarListItem {...car} onClick={onClick} />
      </CartContext>
    )
  }

  it('should contain vehicle summary information', () => {
    const car = {id: '0001', make: 'Avoid', model: 'Pram', year: 1999 };
    renderCarListItem(car)

    expect(screen.getByText(/Avoid/i)).toBeInTheDocument();
    expect(screen.getByText(/Pram/i)).toBeInTheDocument();
    expect(screen.getByText(/1999/i)).toBeInTheDocument();
  });

  it('should contain vehicle image', () => {
    const car = {id: '0001', make: 'Avoid', model: 'Pram', year: 1999, image: 'testurl', color: 'Fuchsia'};
    renderCarListItem(car)

    const image = screen.getByAltText(/Fuchsia/i);

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', car.image);
  });

  it('should call passed onclick when clicked', () => {
    const car = {id: '0001', make: 'Avoid', model: 'Pram', year: 1999, image: 'testurl', color: 'Fuchsia'};
    const mockHandler = jest.fn();
    renderCarListItem(car, mockHandler)

    fireEvent.click(screen.getByText(/Avoid/i))

    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect(mockHandler).toHaveBeenCalledWith(car)
  })

  it('should not allow you to buy a car that is already in your cart', () => {
    const car = {id: '0001', make: 'Avoid', model: 'Pram', year: 1999, image: 'testurl', color: 'Fuchsia'};
    renderCarListItem(car);

    fireEvent.click(screen.getByTitle('Buy'));

    expect(screen.queryByTitle('Buy')).not.toBeInTheDocument();
  });
});
