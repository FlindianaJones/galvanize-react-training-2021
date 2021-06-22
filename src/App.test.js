import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import {getCars} from "./Data/cars";

const cars = [
  { make: 'Toyoda', model: 'Five Runner', year: 2002 },
  { make: 'Rhonda', model: 'Civil', year: 1989 },
  { make: 'Afford', model: 'S Court', year: 2010 },
  { make: 'Heavy', model: 'Hevvelle', year: 1993 },
  { make: 'Avoid', model: 'Pram', year: 2020 },
];

jest.mock('./Data/cars', () => jest.genMockFromModule('./Data/cars'))
jest.mock('./Component/AppContent', () => () => (<div data-testid='mock-app-content'/>))

describe('App', () => {
  it('should have a header', () => {
    getCars.mockReturnValue({then: () => {}})
    render(<App />);
    const header = screen.getByTestId(/header/i);
    expect(header).toBeInTheDocument();
  });

  it('should have App Content', () => {
    getCars.mockReturnValue({then: () => {}})
    render(<App />)

    expect(screen.getByTestId('mock-app-content')).toBeInTheDocument()
  })
});
