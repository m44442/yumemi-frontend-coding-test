import { prefectureApi } from "@/lib/api/prefecture";
import { apiClient } from "@/lib/api/client";
import type { GetPrefecturesResponse, GetPopulationResponse } from "@/types/api";

jest.mock('@/lib/api/client')

describe('PrefectureAPI', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    describe('getPrefectures', () => {  
        it('都道府県一覧を正確に取得できること', async () => {
            const mockResponse: GetPrefecturesResponse = {
                result: {
                    prefectures: [
                        {prefCode: 1, prefName: '北海道'},
                    ]
                },
                status: 200
            }

            ;(apiClient.get as jest.Mock).mockResolvedValueOnce({data: mockResponse})

            const result = await prefectureApi.getPrefectures()
            expect(result).toEqual(mockResponse.result.prefectures)
            expect(apiClient.get).toHaveBeenCalledWith('/api/v1/prefectures')
        })    
    })

    describe('getPopulation', () => {
        it('人口データを正確に取得できること', async () => {
            const mockResponse: GetPopulationResponse = {
                result: {
                    prefecture: {prefCode: 1, prefName: '北海道'},
                    population: [
                        {label: '総人口', data: [{year: 2024, value: 1000000}]},
                        {label: '年少人口', data: [{year: 2024, value: 200000}]},
                        {label: '生産年齢人口', data: [{year: 2024, value: 300000}]},
                        {label: '老年人口', data: [{year: 2024, value: 400000}]}
                    ]
                },
                status: 200
            }

            ;(apiClient.get as jest.Mock).mockResolvedValueOnce({data: mockResponse})

            const result = await prefectureApi.getPopulation(1)
            expect(result).toEqual(mockResponse.result)
            expect(apiClient.get).toHaveBeenCalledWith('/api/v1/population/composition/perYear', {params: {prefCode: 1}})
        })
    })
})