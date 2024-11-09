// PopulationChart.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { PopulationChart } from './PopulationChart';
import { PrefecturePopulation, PopulationTypes } from '@/types/api';

// モックデータ
const mockPopulationData: PrefecturePopulation[] = [
  {
    prefecture: { prefCode: 1, prefName: '北海道' },
    population: [
      {
        label: '総人口',
        data: [
          { year: 2020, value: 5000000 },
          { year: 2021, value: 4900000 }
        ]
      },
      {
        label: '年少人口',
        data: [
          { year: 2020, value: 800000 },
          { year: 2021, value: 750000 }
        ]
      }
    ]
  }
];

// rechartのモック
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  LineChart: ({ children }: { children: React.ReactNode }) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="chart-line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />
}));

describe('PopulationChart', () => {
  it('データがない場合は何も表示されないこと', () => {
    const { container } = render(<PopulationChart populationData={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('すべての人口種別ボタンが表示されること', () => {
    render(<PopulationChart populationData={mockPopulationData} />);
    
    Object.values(PopulationTypes).forEach(type => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });
  });

  it('人口種別を切り替えできること', () => {
    render(<PopulationChart populationData={mockPopulationData} />);
    
    const youngPopButton = screen.getByText(PopulationTypes.YOUNG);
    fireEvent.click(youngPopButton);
    
    expect(youngPopButton).toHaveClass('bg-blue-600');
    expect(screen.getByText(PopulationTypes.TOTAL)).toHaveClass('bg-gray-100');
  });

  it('グラフの要素が正しく表示されること', () => {
    render(<PopulationChart populationData={mockPopulationData} />);
    
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    expect(screen.getByTestId('x-axis')).toBeInTheDocument();
    expect(screen.getByTestId('y-axis')).toBeInTheDocument();
    expect(screen.getByTestId('cartesian-grid')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('legend')).toBeInTheDocument();
    expect(screen.getByTestId('chart-line')).toBeInTheDocument();
  });

  it('正しいクラス名が適用されること', () => {
    const className = 'test-class';
    const { container } = render(
      <PopulationChart populationData={mockPopulationData} className={className} />
    );
    
    expect(container.firstChild).toHaveClass(className);
  });
});