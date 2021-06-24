import Button from "react-bootstrap/Button";
import {useView} from "../Context/ViewContext";

const Feedback = () => {
    const [, setView] = useView()

    const backToSearch = () => {
        setView('search')
    }

    return (
        <>
            <nav>
                <Button variant='danger' title='Continue Shopping' onClick={backToSearch}>X</Button>
            </nav>
            <div className='center-content'>
                <form data-testid='feedback-form' className='vertical'>
                    <label>
                        Title:
                        <input type='text'/>
                    </label>
                    <label>
                        Contact:
                        <input type='text'/>
                    </label>
                    <label>
                        Feedback:
                        <textarea/>
                    </label>
                    <button type='submit'>Submit Feedback</button>
                </form>
            </div>
        </>
    )
}

export default Feedback
