// src/hooks/usePrefectureData/index.ts
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
     const data = await prefectureApi.getPrefectures()
     setPrefectures(data)
   } catch (err) {
     console.error('Prefecture fetch error:', err)
     setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました')
     setPrefectures([])
   } finally {
     setLoading(false)
   }
 }, [])

 const fetchPopulationData = useCallback(async (prefCode: number) => {
   if (!prefCode) return
   
   setLoading(true)
   setError(null)
   try {
     const data = await prefectureApi.getPopulation(prefCode)
     setPopulationData(prev => new Map(prev).set(prefCode, data))
   } catch (err) {
     console.error('Population fetch error:', err)
     setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました')
   } finally {
     setLoading(false)
   }
 }, [])

 const removePopulationData = useCallback((prefCode: number) => {
  setPopulationData(prev => {
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