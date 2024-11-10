import { render, screen, fireEvent } from '@testing-library/react';
import { PrefectureSelector } from './PrefectureSelector';
import { prefecture } from '@/types/api';

const mockPrefectures: prefecture[] = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 2, prefName: '青森県' },
];

describe('PrefectureSelector', () => {
  it('都道府県一覧が表示されること', () => {
    const mockOnSelect = jest.fn();
    render(<PrefectureSelector prefectures={mockPrefectures} onSelect={mockOnSelect} />);

    expect(screen.getByText('北海道')).toBeInTheDocument();
    expect(screen.getByText('青森県')).toBeInTheDocument();
  });

  it('チェックボックスをクリックするとonSelectが呼ばれること', () => {
    const mockOnSelect = jest.fn();
    render(<PrefectureSelector prefectures={mockPrefectures} onSelect={mockOnSelect} />);

    fireEvent.click(screen.getByLabelText('北海道'));
    expect(mockOnSelect).toHaveBeenCalledWith(1, true);
  });

  it('ローディング中はメッセージが表示されること', () => {
    const mockOnSelect = jest.fn();
    render(<PrefectureSelector prefectures={[]} onSelect={mockOnSelect} loading={true} />);

    expect(screen.getByText('都道府県データを読み込み中...')).toBeInTheDocument();
  });

  it('データが空の場合はメッセージが表示されること', () => {
    const mockOnSelect = jest.fn();
    render(<PrefectureSelector prefectures={[]} onSelect={mockOnSelect} />);

    expect(screen.getByText('都道府県データがありません')).toBeInTheDocument();
  });

  it('カスタムクラス名が適用されること', () => {
    const mockOnSelect = jest.fn();
    render(
      <PrefectureSelector
        prefectures={mockPrefectures}
        onSelect={mockOnSelect}
        className="custom-class"
      />
    );

    expect(screen.getByRole('group')).toHaveClass('custom-class');
  });

  it('アクセシビリティ属性が正しく設定されること', () => {
    const mockOnSelect = jest.fn();
    render(<PrefectureSelector prefectures={mockPrefectures} onSelect={mockOnSelect} />);

    expect(screen.getByRole('group')).toHaveAttribute('aria-label', '都道府県選択');
  });

  it('状態が正しく管理されること', () => {
    const mockOnSelect = jest.fn();
    render(<PrefectureSelector prefectures={mockPrefectures} onSelect={mockOnSelect} />);

    const checkbox = screen.getByLabelText('北海道');

    // 選択
    fireEvent.click(checkbox);
    expect(mockOnSelect).toHaveBeenCalledWith(1, true);

    // 選択解除
    fireEvent.click(checkbox);
    expect(mockOnSelect).toHaveBeenCalledWith(1, false);
  });
});
