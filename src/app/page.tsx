'use client';

import { useEffect } from 'react';
import { usePrefectureData } from '@/hooks/usePrefectureData';
import { PrefectureSelector, PopulationChart } from '@/components/features/prefecture';

export default function Home() {
  const {
    prefectures,
    populationData,
    loading,
    error,
    fetchPrefectures,
    fetchPopulationData,
    removePopulationData,
  } = usePrefectureData();

  useEffect(() => {
    fetchPrefectures();
  }, [fetchPrefectures]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="flex justify-center items-center text-2xl font-bold mb-8">
        都道府県別総人口推移グラフ
      </h1>

      {error && (
        <div className="mb-4 text-red-600" role="alert">
          {error}
        </div>
      )}

      <PrefectureSelector
        prefectures={prefectures}
        onSelect={(prefCode, checked) => {
          if (checked) {
            fetchPopulationData(prefCode);
          } else {
            removePopulationData(prefCode);
          }
        }}
        loading={loading}
      />

      {populationData.size > 0 && (
        <PopulationChart
          populationData={Array.from(populationData.values())} // 人口データを配列に変換して渡す
        />
      )}
    </main>
  );
}
