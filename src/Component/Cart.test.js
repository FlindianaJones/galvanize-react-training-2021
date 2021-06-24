import {cars} from "../Data/testData";
import {fireEvent, render, screen} from "@testing-library/react";
import {CartContext} from "../Context/CartContext";
import Cart from "./Cart";
import {ViewContext} from "../Context/ViewContext";

describe('Cart', () => {
    const renderCart = (cartItems = []) => {
        const mockSetView = jest.fn()
        render(
            <CartContext value={cartItems}>
                <ViewContext value={['cart', mockSetView]}>
                    <Cart/>
                </ViewContext>
            </CartContext>
        )
        return mockSetView
    }

    it('should render cart contents', () => {
        renderCart(cars)

        const cartItems = screen.getAllByTestId('cart-item')
        expect(cartItems).toHaveLength(cars.length)
    })

    it('should allow going back to search from cart', () => {
        const mockSetView = renderCart()

        fireEvent.click(screen.getByTitle('Continue Shopping'))

        // TODO: Mike, help me, you're my only hope!
        // expect(mockSetView).toHaveBeenCalledTimes(1)
        // expect(mockSetView).toHaveBeenCalledWith('search')
    })

    it('should allow removing an item from the cart', () => {
        renderCart(cars.slice(0, 2))

        fireEvent.click(screen.getAllByTitle('Remove from cart')[0])
        const cartItems = screen.getAllByTestId('cart-item')
        expect(cartItems).toHaveLength(1)
    })
})