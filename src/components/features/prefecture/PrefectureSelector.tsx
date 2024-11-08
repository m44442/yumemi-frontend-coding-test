import { prefecture } from '@/types/api'
import { Checkbox } from '@/components/ui/Checkbox'

type PrefectureSelectorProps = {
  prefectures: prefecture[]
  onSelect: (prefCode: number, checked: boolean) => void
  className?: string
}

export const PrefectureSelector = ({ 
  prefectures, 
  onSelect,
  className = '' 
}: PrefectureSelectorProps) => {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 ${className}`}>
      {prefectures.map((pref) => (
        <Checkbox
          key={pref.prefCode}
          label={pref.prefName}
          onChange={(checked) => onSelect(pref.prefCode, checked)}
          className="p-2"
        />
      ))}
    </div>
  )
}