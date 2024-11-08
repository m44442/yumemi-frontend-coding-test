// src/components/features/prefecture/PopulationChart.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { PopulationChart } from './PopulationChart'
import { PrefecturePopulation } from '@/types/api'

// Rechartsコンポーネントのモック
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => children,
  LineChart: ({ children }: { children: React.ReactNode }) => <div data-testid="line-chart">{children}</div>,
  Line: ({ dataKey }: { dataKey: string }) => <div data-testid={`line-${dataKey}`} />,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null
}))

const mockPopulationData: PrefecturePopulation[] = [
  {
    prefecture: {
      prefCode: 1,
      prefName: '北海道'
    },
    population: [
      {
        label: '総人口',
        data: [
          { year: 2020, value: 0 },
          { year: 2021, value: 0 }
        ]
      }
    ]
  }
]

describe('PopulationChart', () => {
  it('グラフが正しくレンダリングされること', () => {
    render(
      <PopulationChart 
        populationData={mockPopulationData}
      />
    )

    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
    expect(screen.getByTestId('line-北海道')).toBeInTheDocument()
    expect(screen.getByText('総人口')).toBeInTheDocument()
  })

  it('人口種別を切り替えできること', () => {
    render(
      <PopulationChart 
        populationData={mockPopulationData}
      />
    )

    const youngButton = screen.getByText('年少人口')
    fireEvent.click(youngButton)
    expect(youngButton).toHaveClass('bg-blue-600')
  })

  it('グラフのデータが正しく設定されること', () => {
    render(
      <PopulationChart 
        populationData={mockPopulationData}
      />
    )

    expect(screen.getByTestId('line-北海道')).toBeInTheDocument()
  })

  it('空のデータでもエラーにならないこと', () => {
    render(
      <PopulationChart 
        populationData={[]}
      />
    )

    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
    expect(screen.getByText('総人口')).toBeInTheDocument()
  })
})