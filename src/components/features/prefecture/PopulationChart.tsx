import { PrefecturePopulation, PopulationDataType, PopulationTypes } from '@/types/api'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { useState, useMemo } from 'react'

const colors = [
  '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
  '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
];

type PopulationChartProps = {
  populationData: PrefecturePopulation[]
  className?: string
}

export const PopulationChart = ({ 
  populationData,
  className = '' 
}: PopulationChartProps) => {
    const [selectedType, setSelectedType] = useState<PopulationDataType>(PopulationTypes.TOTAL)

  const chartData = useMemo(() => {
    const years = new Set<number>()
    
    populationData.forEach(prefData => {
      const targetData = prefData.population.find(p => p.label === selectedType)
      targetData?.data.forEach(d => years.add(d.year))
    })

    return Array.from(years).sort().map(year => {
      const dataPoint: { year: number; [key: string]: number | string } = { year }
      
      populationData.forEach(prefData => {
        const targetData = prefData.population.find(p => p.label === selectedType)
        const yearData = targetData?.data.find(d => d.year === year)
        if (yearData) {
          dataPoint[prefData.prefecture.prefName] = yearData.value
        }
      })
      
      return dataPoint
    })
  }, [populationData, selectedType])

  return (
    <div className={className}>
      <div className="mb-4 flex flex-wrap gap-2">
        {Object.values(PopulationTypes).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-lg ${
              selectedType === type 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="h-[500px] w-full">
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              label={{ value: '年度', position: 'insideBottom', offset: -10 }} 
            />
            <YAxis 
              label={{ 
                value: '人口数', 
                angle: -90, 
                position: 'insideLeft',
                offset: 10
              }}
              tickFormatter={(value) => `${(value / 10000).toFixed(0)}万`}
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toLocaleString()}人`]} 
            />
            <Legend />
            {populationData.map((prefData, index) => (
              <Line
                key={prefData.prefecture.prefCode}
                type="monotone"
                dataKey={prefData.prefecture.prefName}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}