import { fireEvent, render, screen } from '@testing-library/react';
import Cars from './Cars';
import { CartContext } from '../Context/CartContext';

describe('cars', () => {
  const cars = [
    {
      make: 'Toyoda',
      model: 'Five Runner',
      year: 2002,
      price: '9001.99',
      color: 'gray',
      image: 'https://www.placecage.com/c/200/300',
    },
    {
      make: 'Rhonda',
      model: 'Civil',
      year: 1989,
      price: '10010.11',
      color: 'grey',
      image: 'https://www.placecage.com/c/200/200',
    },
    {
      make: 'Afford',
      model: 'S Court',
      year: 2010,
      price: '1000.00',
      color: 'grai',
      image: 'https://www.placecage.com/c/300/300',
    },
    {
      make: 'Heavy',
      model: 'Hevvelle',
      year: 1993,
      price: '5005.55',
      color: 'greigh',
      image: 'https://www.placecage.com/c/100/100',
    },
    {
      make: 'Avoid',
      model: 'Pram',
      year: 2020,
      price: '20002.22',
      color: 'greah',
      image: 'https://www.placecage.com/c/400/400',
    },
  ];

  const renderCars = (props) => {
    render(
      <CartContext>
        <Cars {...props} />
      </CartContext>
    );
  };

  it('should have an inventory', () => {
    renderCars({ cars });
    const listItems = screen.getAllByTestId(/list-item/i);
    expect(listItems).toHaveLength(5);
  });

  it('should display a single, selected vehicle', () => {
    renderCars({ cars, selectedCar: cars[0] });

    const listItems = screen.queryAllByTestId(/list-item/i);
    expect(listItems).toHaveLength(0);
    expect(screen.getByText(/\$9001\.99/i)).toBeInTheDocument();
    expect(screen.getByText(/Toyoda/i)).toBeInTheDocument();
    expect(screen.getByText(/Five Runner/i)).toBeInTheDocument();
    expect(screen.getByText(/2002/i)).toBeInTheDocument();
    const image = screen.getByAltText(/gray/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', cars[0].image);
  });

  it('should call the provided handler on clicking a car', async () => {
    const mockHandler = jest.fn();
    renderCars({ cars, onSelect: mockHandler });

    fireEvent.click(screen.getByText(/Civil/i));
    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(mockHandler).toHaveBeenCalledWith(cars[1]);
  });

  it('should call the provided handler on clicking close', async () => {
    const mockHandler = jest.fn();
    renderCars({ cars, selectedCar: cars[0], close: mockHandler });

    fireEvent.click(screen.getByTitle(/Close/i));
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it('should not allow you to buy a car that is already in your cart', () => {
    renderCars({ cars, selectedCar: cars[0] });

    fireEvent.click(screen.getByTitle('Buy'));

    expect(screen.queryByTitle('Buy')).not.toBeInTheDocument();
  });
});
