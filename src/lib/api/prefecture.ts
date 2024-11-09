import { apiClient } from "./client";
import type { prefecture, PrefecturePopulation, GetPrefecturesResponse } from "@/types/api";

export const prefectureApi = {
    // 都道府県一覧を取得する
    async getPrefectures(): Promise<prefecture[]> {
        try {
            const response = await apiClient.get<GetPrefecturesResponse>('/api/v1/prefectures');
            console.log('Raw API Response:', response.data);
            
            if (!response.data || !response.data.result || !Array.isArray(response.data.result)) {
                throw new Error('APIレスポンスの形式が不正です');
            }
            
            return response.data.result;
        } catch (error) {
            console.error('Prefecture API Error:', error);
            throw error;
        }
    },

    // 人口データを取得する
    async getPopulation(prefCode: number): Promise<PrefecturePopulation> {
        try {
            const response = await apiClient.get(`/api/v1/population/composition/perYear`, {
                params: { prefCode }
            });
            
            if (!response.data || !response.data.result) {
                throw new Error('人口データの取得に失敗しました');
            }
            
            return response.data.result;
        } catch (error) {
            console.error('Population API Error:', error);
            throw error;
        }
    }
};