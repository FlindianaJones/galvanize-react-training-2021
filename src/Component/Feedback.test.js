import Feedback from "./Feedback";
import {fireEvent, render, screen} from "@testing-library/react";
import {ViewContext} from "../Context/ViewContext";

describe('feedback', () => {

    const renderFeedback = () => {
        render(
            <ViewContext>
                <Feedback />
            </ViewContext>
        )
    }

    it('should render the feedback form', () => {
        renderFeedback()

        expect(screen.getByTestId('feedback-form')).toBeInTheDocument()
        expect(screen.getByText(/Title/i)).toBeInTheDocument()
        expect(screen.getByText(/Contact/i)).toBeInTheDocument()
        expect(screen.getByText('Feedback:')).toBeInTheDocument()
        expect(screen.getByText(/Submit/i)).toBeInTheDocument()
    })

    it('should go back to search when clicking the back button', () => {
        renderFeedback()

        fireEvent.click(screen.getByText('X'))

        // TODO: figure out how to assert on this
    })
})