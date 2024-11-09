import { render, screen, fireEvent } from '@testing-library/react'
import { PrefectureSelector } from './PrefectureSelector'
import { prefecture } from '@/types/api'

const mockPrefectures: prefecture[] = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 2, prefName: '青森県' }
]

describe('PrefectureSelector', () => {
  it('都道府県一覧が表示されること', () => {
    const mockOnSelect = jest.fn()
    
    render(
      <PrefectureSelector 
        prefectures={mockPrefectures}
        onSelect={mockOnSelect}
      />
    )

    expect(screen.getByText('北海道')).toBeInTheDocument()
    expect(screen.getByText('青森県')).toBeInTheDocument()
  })

  it('チェックボックスをクリックするとonSelectが呼ばれること', () => {
    const mockOnSelect = jest.fn()
    
    render(
      <PrefectureSelector 
        prefectures={mockPrefectures}
        onSelect={mockOnSelect}
      />
    )

    fireEvent.click(screen.getByLabelText('北海道'))
    expect(mockOnSelect).toHaveBeenCalledWith(1, true)
  })

  it('空の配列でもエラーにならないこと', () => {
    const mockOnSelect = jest.fn()
    
    render(
      <PrefectureSelector 
        prefectures={[]}
        onSelect={mockOnSelect}
      />
    )
    
    // エラーが発生しないことを確認
  })

  it('データがない場合はローディングメッセージが表示されること', () => {
    const mockOnSelect = jest.fn()
    
    render(
      <PrefectureSelector 
        prefectures={[]}
        onSelect={mockOnSelect}
      />
    )

    expect(screen.getByText('都道府県データを読み込み中...')).toBeInTheDocument()
  })

  it('カスタムクラス名が適用されること', () => {
    const mockOnSelect = jest.fn()
    
    render(
      <PrefectureSelector 
        prefectures={mockPrefectures}
        onSelect={mockOnSelect}
        className="custom-class"
      />
    )

    expect(screen.getByRole('group')).toHaveClass('custom-class')
  })
})