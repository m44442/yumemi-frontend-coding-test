import { useState, useCallback } from "react"
import { prefectureApi } from "@/lib/api/prefecture"
import type { 
 prefecture,
 PrefecturePopulation 
} from "@/types/api"

export const usePrefectureData = () => {
 const [prefectures, setPrefectures] = useState<prefecture[]>([])
 const [populationData, setPopulationData] = useState<Map<number, PrefecturePopulation>>(new Map())
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState<string | null>(null)

 const fetchPrefectures = useCallback(async () => {
   setLoading(true)
   setError(null)
   try {
     // 都道府県データをAPIから取得
     const data = await prefectureApi.getPrefectures()
     setPrefectures(data)
   } catch (err) {
     // エラーが発生した場合の処理
     console.error('Prefecture fetch error:', err)
     setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました')
     setPrefectures([])
   } finally {
     // ローディング状態を解除
     setLoading(false)
   }
 }, [])

 // 指定された都道府県コードの人口データを取得する関数
 const fetchPopulationData = useCallback(async (prefCode: number) => {
   if (!prefCode) return
   
   // ローディング状態を設定し、エラーをクリア
   setLoading(true)
   setError(null)
   try {
     // 人口データをAPIから取得
     const data = await prefectureApi.getPopulation(prefCode)
     // 取得したデータを状態に追加
     setPopulationData(prev => new Map(prev).set(prefCode, data))
   } catch (err) {
     // エラーが発生した場合の処理
     console.error('Population fetch error:', err)
     setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました')
   } finally {
     // ローディング状態を解除
     setLoading(false)
   }
 }, [])

 // 指定された都道府県コードの人口データを削除する関数
 const removePopulationData = useCallback((prefCode: number) => {
  setPopulationData(prev => {
    // 新しいMapを作成し、指定された都道府県コードのデータを削除
    const newData = new Map(prev)
    newData.delete(prefCode)
    return newData
  })
 }, [])

 return {
   prefectures,
   populationData,
   loading,
   error,
   fetchPrefectures,
   fetchPopulationData,
   removePopulationData
 }
}