import { useState, useCallback } from "react";
import { prefectureApi } from "@/lib/api/prefecture";
import type { 
    prefecture, 
    PrefecturePopulation, 
} from "@/types/api";

export const usePrefectureData = () => {
    // 状態管理
    const [prefectures, setPrefectures] = useState<prefecture[]>([]);
    const [populationData, setPopulationData] = useState<Map<number, PrefecturePopulation>>(new Map());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 都道府県一覧取得
    const fetchPrefectures = useCallback(async () => {
        setLoading(true);
        try {
            const data = await prefectureApi.getPrefectures();
            console.log('Fetched prefectures data:', data);
            if (Array.isArray(data)) {
                setPrefectures(data);
            } else {
                throw new Error('Invalid data format');
            }
        } catch (err) {
            console.error('Prefecture fetch error:', err);
            setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
            setPrefectures([]); // エラー時は空配列を設定
        } finally {
            setLoading(false);
        }
    }, []);

    // 人口データ取得
    const fetchPopulationData = useCallback(async (prefCode: number) => {
        if (!prefCode) return;
        
        setLoading(true);
        try {
            const populationData = await prefectureApi.getPopulation(prefCode);
            console.log('Fetched population data:', populationData);
            setPopulationData(prev => new Map(prev).set(prefCode, populationData));
        } catch (err) {
            console.error('Population fetch error:', err);
            setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        prefectures,
        populationData,
        loading,
        error,
        fetchPrefectures,
        fetchPopulationData,
    };
};