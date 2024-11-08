import { render, screen, fireEvent } from '@testing-library/react'
import { PopulationChart } from './PopulationChart'
import { PrefecturePopulation } from '@/types/api'

// テスト用のモックデータ
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
      },
      {
        label: '年少人口',
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

    // 人口種別の切り替えボタンが存在することを確認
    expect(screen.getByText('総人口')).toBeInTheDocument()
    expect(screen.getByText('年少人口')).toBeInTheDocument()
    expect(screen.getByText('生産年齢人口')).toBeInTheDocument()
    expect(screen.getByText('老年人口')).toBeInTheDocument()
  })

  it('人口種別を切り替えできること', () => {
    render(
      <PopulationChart 
        populationData={mockPopulationData}
      />
    )

    // 年少人口ボタンをクリック
    const youngButton = screen.getByText('年少人口')
    fireEvent.click(youngButton)

    // ボタンのスタイルが変更されていることを確認
    expect(youngButton).toHaveClass('bg-blue-600')
  })

  it('都道府県のデータが表示されること', () => {
    render(
      <PopulationChart 
        populationData={mockPopulationData}
      />
    )

    // 都道府県名が表示されていることを確認
    expect(screen.getByText('北海道')).toBeInTheDocument()
  })

  it('空のデータでもエラーにならないこと', () => {
    render(
      <PopulationChart 
        populationData={[]}
      />
    )

    // 人口種別の切り替えボタンは表示されている
    expect(screen.getByText('総人口')).toBeInTheDocument()
  })
})