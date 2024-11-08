import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('ラベルが正しく表示されること', () => {
    render(
      <Checkbox 
        label="テスト"
        onChange={() => {}}
      />
    )
    
    expect(screen.getByLabelText('テスト')).toBeInTheDocument()
  })

  it('クリック時にonChangeが呼ばれること', () => {
    const mockOnChange = jest.fn()
    render(
      <Checkbox 
        label="テスト"
        onChange={mockOnChange}
      />
    )

    const checkbox = screen.getByLabelText('テスト')
    fireEvent.click(checkbox)

    expect(mockOnChange).toHaveBeenCalledWith(true)
  })

  it('追加のclassNameが適用されること', () => {
    render(
      <Checkbox 
        label="テスト"
        onChange={() => {}}
        className="test-class"
      />
    )

    const label = screen.getByText('テスト').parentElement
    expect(label).toHaveClass('test-class')
  })

  it('チェックを外した時にfalseが返ること', () => {
    const mockOnChange = jest.fn()
    render(
      <Checkbox 
        label="テスト"
        onChange={mockOnChange}
      />
    )

    const checkbox = screen.getByLabelText('テスト')
    fireEvent.click(checkbox) // チェックを入れる
    fireEvent.click(checkbox) // チェックを外す

    expect(mockOnChange).toHaveBeenLastCalledWith(false)
  })
})