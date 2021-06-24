import {cars} from "./testData";
import {getCars} from "./cars";
import fetchMock from "fetch-mock-jest";

describe('cars API', () => {

    const matcher = {
        url: 'http://localhost:5000/api/vehicles'
    }

    it('should pass API results through', async () => {
        const mockAPI = fetchMock.get(matcher, { status: 200, body: cars })
        const gotData = await getCars()

        expect(mockAPI).toHaveFetched()
        expect(gotData).toStrictEqual(cars)
    })
})