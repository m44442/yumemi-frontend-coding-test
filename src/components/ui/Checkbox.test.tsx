import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('ラベルが正しく表示されること', () => {
    render(<Checkbox label="テスト" onChange={() => {}} />);

    expect(screen.getByLabelText('テスト')).toBeInTheDocument();
  });

  it('クリック時にonChangeが呼ばれること', () => {
    const mockOnChange = jest.fn();
    render(<Checkbox label="テスト" onChange={mockOnChange} />);

    const checkbox = screen.getByLabelText('テスト');
    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it('追加のclassNameが適用されること', () => {
    render(<Checkbox label="テスト" onChange={() => {}} className="test-class" />);

    const label = screen.getByText('テスト').parentElement;
    expect(label).toHaveClass('test-class');
  });

  it('チェックを外した時にfalseが返ること', () => {
    const mockOnChange = jest.fn();
    render(<Checkbox label="テスト" onChange={mockOnChange} />);

    const checkbox = screen.getByLabelText('テスト');
    fireEvent.click(checkbox); // チェックをつける
    fireEvent.click(checkbox); // チェックを外す

    expect(mockOnChange).toHaveBeenLastCalledWith(false);
  });

  it('チェックマークをつけたり外したりできること', () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Test Checkbox" onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    // チェックをつける
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(handleChange).toHaveBeenCalledWith(true);

    // チェックを外す
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('初期状態がチェックされている場合', () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Test Checkbox" checked={true} onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});
