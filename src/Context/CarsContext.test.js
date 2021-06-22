import { renderHook } from '@testing-library/react-hooks'
import {CarsContext, useCars} from "./CarsContext";
import {getCars} from "../Data/cars";

const cars = [
    { make: 'Toyoda', model: 'Five Runner', year: 2002 },
    { make: 'Rhonda', model: 'Civil', year: 1989 },
    { make: 'Afford', model: 'S Court', year: 2010 },
    { make: 'Heavy', model: 'Hevvelle', year: 1993 },
    { make: 'Avoid', model: 'Pram', year: 2020 },
];

jest.mock('../Data/cars', () => jest.genMockFromModule('../Data/cars'))

describe('Cars Context', () => {
    it('should provide a list of cars', () => {
        const wrapper = ({children}) => <CarsContext value={{cars}}>{children}</CarsContext>
        const captainHook = renderHook(() => useCars(), {wrapper}).result

        expect(captainHook.current.cars).toHaveLength(5)
    })

    it('should have no cars when loading', () => {
        const wrapper = ({children}) => <CarsContext>{children}</CarsContext>
        const captainHook = renderHook(() => useCars(), {wrapper}).result

        expect(captainHook.current.cars).toBeUndefined()
        expect(captainHook.current.loading).toBeTruthy()
    })

    it('should retrieve cars', () => {
        const wrapper = ({children}) => <CarsContext>{children}</CarsContext>
        const captainHook = renderHook(() => useCars(), {wrapper}).result

        expect(getCars).toHaveBeenCalledTimes(1)
    })
})