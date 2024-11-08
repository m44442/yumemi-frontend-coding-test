import { useState, useCallback } from "react";
import { prefectureApi } from "@/lib/api/prefecture";
import type { prefecture, PrefecturePopulation } from "@/types/api";


export const usePrefectureData = () => {
    // 都道府県一覧の状態管理
    const [prefectures, setPrefectures] = useState<prefecture[]>([]);

    // 人口データの状態管理（都道府県コードをキーとしたMap）
    const [populationData, setPopulationData] = useState<Map<number, PrefecturePopulation>>(new Map());

    // ローディング状態の管理
    const [loading, setLoading] = useState(false);
    
    // エラー状態の管理
    const [error, setError] = useState<string | null>(null);

    // 都道府県一覧を取得する関数
    const fetchPrefectures = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await prefectureApi.getPrefectures();
            setPrefectures(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
        } finally {
            setLoading(false)
        }
    }, [])

    // 指定した都道府県の人口データを取得する関数
    const fetchPopulationData = useCallback(async (prefCode: number) => {
        setLoading(true)
        setError(null)
        try {
            const data = await prefectureApi.getPopulation(prefCode)
            setPopulationData((prev) => new Map(prev.set(prefCode, data)))
        } catch (err) {
            setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました')
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        prefectures,
        populationData,
        loading,
        error,
        fetchPrefectures,
        fetchPopulationData,
    }
}