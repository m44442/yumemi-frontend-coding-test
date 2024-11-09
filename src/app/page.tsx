'use client'

import { useEffect } from 'react'
import { usePrefectureData } from '@/hooks/usePrefectureData'
import { PrefectureSelector, PopulationChart } from '@/components/features/prefecture'

export default function Home() {
  const { 
    prefectures, 
    populationData, 
    loading, 
    error, 
    fetchPrefectures, 
    fetchPopulationData 
  } = usePrefectureData()

  useEffect(() => {
    fetchPrefectures()
  }, [fetchPrefectures])

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">都道府県別人口推移グラフ</h1>
      
      {error && (
        <div className="text-red-600 mb-4">{error}</div>
      )}

      {loading && (
        <div className="text-gray-600 mb-4">データを読み込み中...</div>
      )}

      <PrefectureSelector
        prefectures={prefectures}
        onSelect={(prefCode, checked) => {
          if (checked) {
            fetchPopulationData(prefCode)
          }
        }}
        className="mb-8"
      />

      {populationData.size > 0 && (
        <PopulationChart
          populationData={Array.from(populationData.values())}
          className="mt-8"
        />
      )}
    </main>
  )
}  