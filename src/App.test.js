import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should have a header', () => {
    render(<App />);
    const header = screen.getByTestId(/header/i);
    expect(header).toBeInTheDocument();
  });
  it('should have an inventory', () => {
    render(<App />);
    const listItems = screen.getAllByTestId(/list-item/i);
    expect(listItems).toHaveLength(5);
  });
});
