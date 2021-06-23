import { fireEvent, render, screen } from '@testing-library/react';
import { CarsContext } from '../Context/CarsContext';
import AppContent from './AppContent';
import { CartContext } from '../Context/CartContext';

describe('App Content', () => {
  const cars = [
    { make: 'Toyoda', model: 'Five Runner', year: 2002 },
    { make: 'Rhonda', model: 'Civil', year: 1989 },
    { make: 'Afford', model: 'S Court', year: 2010, price: '9001.99' },
    { make: 'Heavy', model: 'Hevvelle', year: 1993 },
    { make: 'Avoid', model: 'Pram', year: 2020 },
  ];

  const renderAppContent = (cartItems = []) => {
    render(
      <CarsContext value={cars}>
        <CartContext value={cartItems}>
          <AppContent />
        </CartContext>
      </CarsContext>
    );
  };

  it('should have an inventory', () => {
    renderAppContent();
    const listItems = screen.getAllByTestId(/list-item/i);
    expect(listItems).toHaveLength(5);
  });

  it('should have search form', () => {
    renderAppContent();
    const makeField = screen.getByTestId(/make-search/i);
    const modelField = screen.getByTestId(/model-search/i);
    const yearField = screen.getByTestId(/year-search/i);
    const submitButton = screen.getByText('Search');

    expect(makeField).toBeInTheDocument();
    expect(modelField).toBeInTheDocument();
    expect(yearField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should limit list to make searched for', () => {
    renderAppContent();
    const makeField = screen.getByTestId(/make-search/i);
    const submitButton = screen.getByText('Search');

    fireEvent.change(makeField, { target: { value: 'TOY' } }); // partial and case neutral
    fireEvent.click(submitButton);

    const listItems = screen.getAllByTestId(/list-item/i);
    expect(listItems).toHaveLength(1);
  });

  it('should limit list to model searched for', () => {
    renderAppContent();
    const modelField = screen.getByTestId(/model-search/i);
    const submitButton = screen.getByText('Search');

    fireEvent.change(modelField, { target: { value: 'runner' } });
    fireEvent.click(submitButton);

    const listItems = screen.getAllByTestId(/list-item/i);
    expect(listItems).toHaveLength(1);
  });

  it('should limit list to year searched for', () => {
    renderAppContent();
    const yearField = screen.getByTestId(/year-search/i);
    const submitButton = screen.getByText('Search');

    fireEvent.change(yearField, { target: { value: 89 } }); // partial year
    fireEvent.click(submitButton);

    const listItems = screen.getAllByTestId(/list-item/i);
    expect(listItems).toHaveLength(1);
  });

  it('should display single car detail view on click', () => {
    renderAppContent();
    fireEvent.click(screen.getByText(/Afford/i));

    const listItems = screen.queryAllByTestId(/list-item/i);
    expect(listItems).toHaveLength(0);
    expect(screen.getByText(/\$9001\.99/i)).toBeInTheDocument();
  });

  it('should display list of cars again if you search with a selected car', () => {
    renderAppContent();
    fireEvent.click(screen.getByText(/Afford/i));

    const yearField = screen.getByTestId(/year-search/i);
    const submitButton = screen.getByText('Search');

    fireEvent.change(yearField, { target: { value: 89 } }); // partial year
    fireEvent.click(submitButton);

    expect(screen.queryByText(/\$9001\.99/i)).not.toBeInTheDocument();
    const listItems = screen.getAllByTestId(/list-item/i);
    expect(listItems).toHaveLength(1);
  });

  it('should close detail view on clicking the close button', () => {
    renderAppContent();
    fireEvent.click(screen.getByText(/Afford/i));
    fireEvent.click(screen.getByTitle(/Close/i));

    expect(screen.queryByText(/\$9001\.99/i)).not.toBeInTheDocument();
    const listItems = screen.getAllByTestId(/list-item/i);
    expect(listItems).toHaveLength(5);
  });

  it('should show cart as empty if cart has no items', () => {
    renderAppContent();

    expect(screen.getByText('Cart Empty')).toBeInTheDocument();
  });

  it('should show number of items in the cart', () => {
    const mockCart = ['1', '2', '3'];
    renderAppContent(mockCart);

    expect(screen.getByText(`Cart (${mockCart.length})`)).toBeInTheDocument();
  });

  it('should add an item to the cart when buying item from the list', () => {
    renderAppContent();

    fireEvent.click(screen.getAllByTitle('Buy')[0]);

    expect(screen.getByText(`Cart (1)`)).toBeInTheDocument();
  });

  it('should add an item to the cart when buying item from the car detail', () => {
    renderAppContent();

    fireEvent.click(screen.getByText(/Afford/i));
    fireEvent.click(screen.getByTitle('Buy'));

    expect(screen.getByText(`Cart (1)`)).toBeInTheDocument();
  });
});
