import { renderHook } from '@testing-library/react-hooks'
import {CarsContext, useCars} from "./CarsContext";
import {getCars} from "../Data/cars";
import {act} from "@testing-library/react";

const cars = [
    { make: 'Toyoda', model: 'Five Runner', year: 2002 },
    { make: 'Rhonda', model: 'Civil', year: 1989 },
    { make: 'Afford', model: 'S Court', year: 2010 },
    { make: 'Heavy', model: 'Hevvelle', year: 1993 },
    { make: 'Avoid', model: 'Pram', year: 2020 },
];

jest.mock('../Data/cars', () => jest.genMockFromModule('../Data/cars'))

describe('Cars Context', () => {
    it('should use provided cars and not load', () => {
        const wrapper = ({children}) => <CarsContext value={cars}>{children}</CarsContext>
        const captainHook = renderHook(() => useCars(), {wrapper}).result

        expect(captainHook.current.cars).toHaveLength(cars.length)
        expect(captainHook.current.loading).not.toBeTruthy()
        expect(getCars).not.toHaveBeenCalled()
    })

    it('should retrieve cars if none are provided', () => {
        const wrapper = ({children}) => <CarsContext>{children}</CarsContext>
        // A very mock promise so we don't have actual async in the test asserting on the state before we call out
        getCars.mockReturnValue({then: () => {}})
        const captainHook = renderHook(() => useCars(), {wrapper}).result

        expect(getCars).toHaveBeenCalledTimes(1)
        expect(captainHook.current.loading).toBeTruthy()
    })

    it('should no longer be loading once cars are retrieved', async () => {
        const wrapper = ({children}) => <CarsContext>{children}</CarsContext>
        getCars.mockResolvedValue(cars)
        const captainHook = renderHook(() => useCars(), {wrapper})
        let result
        await act(async () => {result = captainHook.result})

        expect(result.current.loading).not.toBeTruthy()
        expect(result.current.cars).toHaveLength(cars.length)
    })
})