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

  // 初期データ取得
  useEffect(() => {
    fetchPrefectures()
  }, [fetchPrefectures])

  // 都道府県選択時の処理
  const handlePrefectureSelect = (prefCode: number, checked: boolean) => {
    if (checked) {
      fetchPopulationData(prefCode)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">都道府県別人口推移グラフ</h1>
      
      {/* エラー表示 */}
      {error && (
        <div className="text-red-600 mb-4" role="alert">
          {error}
        </div>
      )}

      {/* ローディング表示 */}
      {loading && (
        <div className="text-gray-600 mb-4" role="status">
          データを読み込み中...
        </div>
      )}

      {/* 都道府県選択 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">都道府県を選択</h2>
        <PrefectureSelector 
          prefectures={prefectures}
          onSelect={handlePrefectureSelect}
        />
      </section>

      {/* 人口グラフ */}
      <section>
        <h2 className="text-xl font-semibold mb-4">人口推移グラフ</h2>
        <PopulationChart 
          populationData={Array.from(populationData.values())}
        />
      </section>
    </main>
  )
}