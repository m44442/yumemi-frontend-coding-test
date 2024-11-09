import { apiClient } from '@/lib/api/client'
import { prefectureApi } from '@/lib/api/prefecture'
import type { GetPrefecturesResponse, GetPopulationResponse } from '@/types/api'

jest.mock('@/lib/api/client')

describe('PrefectureAPI', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('getPrefectures', () => {
        it('都道府県一覧を正確に取得できること', async () => {
            const mockResponse: GetPrefecturesResponse = {
                message: null,
                result: [
                    { prefCode: 1, prefName: '北海道' },
                    { prefCode: 2, prefName: '青森県' }
                ]
            }

            ;(apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse })

            const result = await prefectureApi.getPrefectures()
            expect(result).toEqual(mockResponse.result)
            expect(apiClient.get).toHaveBeenCalledWith('/api/v1/prefectures')
        })

        it('エラーレスポンスの場合、例外をスローすること', async () => {
            const mockErrorResponse = {
                message: 'エラーが発生しました',
                result: null
            }

            ;(apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockErrorResponse })

            await expect(prefectureApi.getPrefectures()).rejects.toThrow('APIレスポンスの形式が不正です')
        })

        it('ネットワークエラーの場合、例外をスローする��と', async () => {
            ;(apiClient.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'))

            await expect(prefectureApi.getPrefectures()).rejects.toThrow('Network Error')
        })
    })

    describe('getPopulation', () => {
        const mockPrefCode = 1

        it('人口データを正確に取得できること', async () => {
            const mockResponse: GetPopulationResponse = {
                message: null,
                result: {
                    boundaryYear: 2020,
                    data: [
                        {
                            label: '総人口',
                            data: [
                                { year: 2020, value: 5000000 },
                                { year: 2021, value: 4900000 }
                            ]
                        }
                    ]
                }
            }

            ;(apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse })

            const result = await prefectureApi.getPopulation(mockPrefCode)
            expect(result).toEqual({
                prefecture: { prefCode: 1, prefName: '北海道' },
                population: mockResponse.result.data
            })
            expect(apiClient.get).toHaveBeenCalledWith('/api/v1/population/composition/perYear', {
                params: { prefCode: mockPrefCode }
            })
        })

        it('エラーレスポンスの場合、例外をスローすること', async () => {
            const mockErrorResponse = {
                message: 'エラーが発生しました',
                result: null
            }

            ;(apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockErrorResponse })

            await expect(prefectureApi.getPopulation(mockPrefCode)).rejects.toThrow('人口データの取得に失敗しました')
        })

        it('ネットワークエラーの場合、例外をスローすること', async () => {
            ;(apiClient.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'))

            await expect(prefectureApi.getPopulation(mockPrefCode)).rejects.toThrow('Network Error')
        })
    })
})