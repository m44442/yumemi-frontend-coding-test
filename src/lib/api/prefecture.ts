import { apiClient } from "./client";
import type { prefecture, PrefecturePopulation } from "@/types/api";

export const prefectureApi = {
    // 都道府県一覧を取得する
    async getPrefectures(): Promise<prefecture[]> {
        const response = await apiClient.get('/api/v1/prefectures');
        return response.data.result.prefectures;
    },

    //人口データを取得する
    async getPopulation(prefCode: number): Promise<PrefecturePopulation> {
        const response = await apiClient.get(`/api/v1/population/composition/perYear`, {
        params: { prefCode }
    })
    return response.data.result;
    }
}