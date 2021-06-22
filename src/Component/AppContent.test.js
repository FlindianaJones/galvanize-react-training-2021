import {fireEvent, render, screen} from "@testing-library/react";
import {CarsContext} from "../Context/CarsContext";
import AppContent from "./AppContent";

describe('App Content', () => {
    const cars = [
        { make: 'Toyoda', model: 'Five Runner', year: 2002 },
        { make: 'Rhonda', model: 'Civil', year: 1989 },
        { make: 'Afford', model: 'S Court', year: 2010 },
        { make: 'Heavy', model: 'Hevvelle', year: 1993 },
        { make: 'Avoid', model: 'Pram', year: 2020 },
    ];

    beforeEach(() => {
        render(
            <CarsContext value={{cars}}>
                <AppContent />
            </CarsContext>
        )
    });

    it('should have an inventory', () => {
        const listItems = screen.getAllByTestId(/list-item/i);
        expect(listItems).toHaveLength(5);
    });

    it('should have search form', () => {
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
        const makeField = screen.getByTestId(/make-search/i);
        const submitButton = screen.getByText('Search');

        fireEvent.change(makeField, { target: { value: 'Toyoda'}});
        fireEvent.click(submitButton);

        const listItems = screen.getAllByTestId(/list-item/i);
        expect(listItems).toHaveLength(1);
    });

    it('should limit list to model searched for', () => {
        const modelField = screen.getByTestId(/model-search/i);
        const submitButton = screen.getByText('Search');

        fireEvent.change(modelField, { target: { value: 'Five Runner'}});
        fireEvent.click(submitButton);

        const listItems = screen.getAllByTestId(/list-item/i);
        expect(listItems).toHaveLength(1);
    });

    it('should limit list to year searched for', () => {
        const yearField = screen.getByTestId(/year-search/i);
        const submitButton = screen.getByText('Search');

        fireEvent.change(yearField, { target: { value: 1989}});
        fireEvent.click(submitButton);

        const listItems = screen.getAllByTestId(/list-item/i);
        expect(listItems).toHaveLength(1);
    });
})