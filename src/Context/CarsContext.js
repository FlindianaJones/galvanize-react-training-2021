import {createContext, useContext, useEffect, useState} from 'react'
import {getCars} from "../Data/cars";

const carsProvider = createContext(undefined)
export const useCars = () => useContext(carsProvider)

export const CarsContext = ({children, value}) => {
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState(value)

    useEffect(() => {
        getCars()
    }, [])

    return (
        <carsProvider.Provider value={{loading, ...state}}>
            {children}
        </carsProvider.Provider>
    )
}
