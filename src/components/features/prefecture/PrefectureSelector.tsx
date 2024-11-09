// src/components/features/prefecture/PrefectureSelector.tsx
import { prefecture } from '@/types/api'
import { Checkbox } from '@/components/ui/Checkbox'
import { useState, useCallback } from 'react'

type PrefectureSelectorProps = {
 prefectures: prefecture[]
 onSelect: (prefCode: number, checked: boolean) => void
 className?: string
 loading?: boolean
}

export const PrefectureSelector = ({
 prefectures,
 onSelect,
 className = '',
 loading = false
}: PrefectureSelectorProps) => {
 const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([])

 const handleChange = useCallback((prefCode: number, checked: boolean) => {
   setSelectedPrefectures(prev => 
     checked
       ? [...prev, prefCode]
       : prev.filter(code => code !== prefCode)
   )
   onSelect(prefCode, checked)
 }, [onSelect])

 if (loading) {
   return (
     <div className={`text-gray-500 ${className}`}>
       都道府県データを読み込み中...
     </div>
   )
 }

 if (!Array.isArray(prefectures) || prefectures.length === 0) {
   return (
     <div className={`text-gray-500 ${className}`}>
       都道府県データがありません
     </div>
   )
 }

 console.log('PrefectureSelector:', prefectures);  // デバッグログ追加

 return (
   <div
     className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 ${className}`}
     role="group"
     aria-label="都道府県選択"
   >
     {prefectures.map((pref) => (
       <Checkbox
         key={pref.prefCode}
         label={pref.prefName}
         checked={selectedPrefectures.includes(pref.prefCode)}
         onChange={(checked) => handleChange(pref.prefCode, checked)}
         className="p-2 border border-gray-200 rounded hover:bg-gray-50"
       />
     ))}
   </div>
 )
}