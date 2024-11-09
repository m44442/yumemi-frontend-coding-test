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
          { year: 2020, value: 5000000 },
          { year: 2021, value: 4900000 }
        ]
      },
      {
        label: '年少人口',
        data: [
          { year: 2020, value: 1000000 },
          { year: 2021, value: 900000 }
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

    fireEvent.click(screen.getByText('年少人口'))
    expect(screen.getByTestId('line-北海道')).toBeInTheDocument()
  })

  it('都道府県のデータが表示されること', () => {
    render(
      <PopulationChart 
        populationData={mockPopulationData}
      />
    )

    const chart = screen.getByTestId('line-chart')
    expect(chart).toBeInTheDocument()
    expect(screen.getByTestId('line-北海道')).toBeInTheDocument()
  })

  it('空のデータでもエラーにならないこと', () => {
    render(
      <PopulationChart 
        populationData={[]}
      />
    )

    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
  })
})