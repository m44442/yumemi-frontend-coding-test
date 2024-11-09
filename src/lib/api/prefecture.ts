import { apiClient } from "./client"
import type { 
 prefecture, 
 PrefecturePopulation,
 GetPrefecturesResponse,
 GetPopulationResponse 
} from '@/types/api'

export const prefectureApi = {
 // 都道府県一覧を取得する
 async getPrefectures(): Promise<prefecture[]> {
   const response = await apiClient.get<GetPrefecturesResponse>('/api/v1/prefectures')
   return response.data.result.prefectures
 },

 // 人口データを取得する
 async getPopulation(prefCode: number): Promise<PrefecturePopulation> {
   const response = await apiClient.get<GetPopulationResponse>(
     '/api/v1/population/composition/perYear',
     { params: { prefCode } }
   )
   return response.data.result
 }
}