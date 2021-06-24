import {fireEvent, render, screen} from "@testing-library/react";
import {CarsContext} from "../Context/CarsContext";
import Search from "./Search";
import {CartContext} from "../Context/CartContext";
import {cars} from "../Data/testData";

describe('Search', () => {

    const renderSearch = (cartItems = []) => {
        render(
            <CarsContext value={cars}>
                <CartContext value={cartItems}>
                    <Search/>
                </CartContext>
            </CarsContext>
        )
    }

    it('should have an inventory', () => {
        renderSearch();
        const listItems = screen.getAllByTestId(/list-item/i);
        expect(listItems).toHaveLength(6);
    });

    it('should have search form', () => {
        renderSearch();
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
        renderSearch();
        const makeField = screen.getByTestId(/make-search/i);
        const submitButton = screen.getByText('Search');

        fireEvent.change(makeField, {target: {value: 'TOY'}}); // partial and case neutral
        fireEvent.click(submitButton);

        const listItems = screen.getAllByTestId(/list-item/i);
        expect(listItems).toHaveLength(1);
    });

    it('should limit list to model searched for', () => {
        renderSearch();
        const modelField = screen.getByTestId(/model-search/i);
        const submitButton = screen.getByText('Search');

        fireEvent.change(modelField, {target: {value: 'runner'}});
        fireEvent.click(submitButton);

        const listItems = screen.getAllByTestId(/list-item/i);
        expect(listItems).toHaveLength(1);
    });

    it('should limit list to year searched for', () => {
        renderSearch();
        const yearField = screen.getByTestId(/year-search/i);
        const submitButton = screen.getByText('Search');

        fireEvent.change(yearField, {target: {value: 89}}); // partial year
        fireEvent.click(submitButton);

        const listItems = screen.getAllByTestId(/list-item/i);
        expect(listItems).toHaveLength(1);
    });

    it('should display single car detail view on click', () => {
        renderSearch();
        fireEvent.click(screen.getByText(/Afford/i));

        const listItems = screen.queryAllByTestId(/list-item/i);
        expect(listItems).toHaveLength(0);
        expect(screen.getByText(/\$1000\.00/i)).toBeInTheDocument();
    });

    it('should display list of cars again if you search with a selected car', () => {
        renderSearch();
        fireEvent.click(screen.getByText(/Afford/i));

        const yearField = screen.getByTestId(/year-search/i);
        const submitButton = screen.getByText('Search');

        fireEvent.change(yearField, {target: {value: 89}}); // partial year
        fireEvent.click(submitButton);

        expect(screen.queryByText(/\$9001\.99/i)).not.toBeInTheDocument();
        const listItems = screen.getAllByTestId(/list-item/i);
        expect(listItems).toHaveLength(1);
    });

    it('should close detail view on clicking the close button', () => {
        renderSearch();
        fireEvent.click(screen.getByText(/Afford/i));
        fireEvent.click(screen.getByTitle(/Close/i));

        expect(screen.queryByText(/\$9001\.99/i)).not.toBeInTheDocument();
        const listItems = screen.getAllByTestId(/list-item/i);
        expect(listItems).toHaveLength(6);
    });
})