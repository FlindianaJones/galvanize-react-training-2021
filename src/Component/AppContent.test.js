import {fireEvent, render, screen} from '@testing-library/react';
import {CarsContext} from '../Context/CarsContext';
import AppContent from './AppContent';
import {CartContext} from '../Context/CartContext';
import {cars} from "../Data/testData";
import {ViewContext} from "../Context/ViewContext";

describe('App Content', () => {
    const renderAppContent = (cartItems = []) => {
        render(
            <ViewContext>
                <CarsContext value={cars}>
                    <CartContext value={cartItems}>
                        <AppContent/>
                    </CartContext>
                </CarsContext>
            </ViewContext>
        );
    };

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

    it('should display shopping cart when clicking on cart in nav bar', () => {
        renderAppContent(cars.slice(0, 5));

        fireEvent.click(screen.getByText('Cart (5)'))

        const listItems = screen.queryAllByTestId(/list-item/i);
        expect(listItems).toHaveLength(0);
        expect(screen.getAllByTestId('cart-item')).toHaveLength(5)
    })

    it('should display feedback form when clicking on feedback button in nav bar', () => {
        renderAppContent()

        fireEvent.click(screen.getByText('Leave Feedback'))

        const listItems = screen.queryAllByTestId(/list-item/i);
        expect(listItems).toHaveLength(0);
        expect(screen.getByTestId('feedback-form')).toBeInTheDocument()
    })
});
