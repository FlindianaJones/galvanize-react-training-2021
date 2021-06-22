import { render, screen } from '@testing-library/react';
import CarListItem from './CarListItem';

describe('Car List Item', () => {
  it('should contain vehicle summary information', () => {
    const car = {id: '0001', make: 'Avoid', model: 'Pram', year: 1999 };
    render(<CarListItem {...car} />);

    expect(screen.getByText(/Avoid/i)).toBeInTheDocument();
    expect(screen.getByText(/Pram/i)).toBeInTheDocument();
    expect(screen.getByText(/1999/i)).toBeInTheDocument();
  });
  it('should contain vehicle image', () => {
    const car = {id: '0001', make: 'Avoid', model: 'Pram', year: 1999, image: 'testurl', color: 'Fuchsia'};
    render(<CarListItem {...car} />);

    const image = screen.getByAltText(/Fuchsia/i);

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', car.image);
  });
});
