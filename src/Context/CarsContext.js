import {createContext, useContext, useEffect, useState} from 'react'
import {getCars} from "../Data/cars";

const carsProvider = createContext(undefined)
export const useCars = () => useContext(carsProvider)

export const CarsContext = ({children, value}) => {
    const [loading, setLoading] = useState(!value)
    const [cars, setCars] = useState(value || [])

    useEffect(() => {
        if (!value) {
            getCars().then(cars => {
                setLoading(false)
                setCars(cars)
            })
        }
    }, [value])

    return (
        <carsProvider.Provider value={{loading, cars}}>
            {children}
        </carsProvider.Provider>
    )
}
