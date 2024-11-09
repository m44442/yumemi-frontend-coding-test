import { prefecture } from '@/types/api'
import { Checkbox } from '@/components/ui/Checkbox'
import { useState, useCallback } from 'react'

type PrefectureSelectorProps = {
  prefectures: prefecture[] // 都道府県データの配列
  onSelect: (prefCode: number, checked: boolean) => void // 都道府県が選択されたときに呼び出される関数
  className?: string // カスタムクラス名
  loading?: boolean // ローディング状態
}

export const PrefectureSelector = ({
  prefectures,
  onSelect,
  className = '',
  loading = false
}: PrefectureSelectorProps) => {
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]) // 選択された都道府県の状態を管理

  // チェックボックスの状態が変わったときに呼び出される関数
  const handleChange = useCallback((prefCode: number, checked: boolean) => {
    setSelectedPrefectures(prev => 
      checked
        ? [...prev, prefCode] // チェックされた場合、都道府県コードを追加
        : prev.filter(code => code !== prefCode) // チェックが外された場合、都道府県コードを削除
    )
    onSelect(prefCode, checked) // 親コンポーネントに通知
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

  return (
    <div
      className={`grid grid-cols-2 mb-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 ${className}`}
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