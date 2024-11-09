import { PrefecturePopulation, PopulationDataType, PopulationTypes } from '@/types/api'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { useState, useMemo } from 'react'

// 線の色定義
const colors = [
  '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
  '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
];

type PopulationChartProps = {
  populationData: PrefecturePopulation[] // 都道府県別人口データの配列
  className?: string // カスタムクラス名
}

export const PopulationChart = ({ populationData = [], className = '' }: PopulationChartProps) => {
  const [selectedType, setSelectedType] = useState<PopulationDataType>(PopulationTypes.TOTAL); // 選択された人口データの種類を管理

  const chartData = useMemo(() => {
    if (!populationData?.length) return [];

    const years = new Set<number>();
    populationData.forEach(prefData => {
      const populationData = prefData.population?.find(p => p.label === selectedType); // 選択された種類の人口データを取得
      populationData?.data.forEach(d => years.add(d.year)); // 年ごとのデータをセットに追加
    });

    return Array.from(years).sort().map(year => {
      const dataPoint: { year: number; [key: string]: number | string } = { year }; // 年をキーとするデータポイントを作成
      populationData.forEach(prefData => {
        const populationData = prefData.population?.find(p => p.label === selectedType);
        const yearData = populationData?.data.find(d => d.year === year);
        if (yearData) {
          dataPoint[prefData.prefecture.prefName] = yearData.value; // 都道府県名をキーとして人口データを追加
        }
      });
      return dataPoint;
    });
  }, [populationData, selectedType]); // populationDataとselectedTypeが変更されたときに再計算

  if (!populationData.length) return null; // データがない場合は何も表示しない

  return (
    <div className={className}>
      <div className="flex justify-center items-center mb-5 flex flex-wrap gap-2">
        {Object.values(PopulationTypes).map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-lg ${
              selectedType === type ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {chartData.length > 0 && (
        <div className="h-[500px] w-full">
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={value => `${(value / 10000).toFixed(0)}万`} />
              <Tooltip formatter={value => [`${value.toLocaleString()}人`]} />
              <Legend />
              {populationData.map((prefData, index) => (
                <Line
                  key={prefData.prefecture.prefCode}
                  type="monotone"
                  dataKey={prefData.prefecture.prefName} // データキーとして都道府県名を使用
                  stroke={colors[index % colors.length]} // 線の色を設定
                  strokeWidth={2} // 線の太さを設定
                  dot={false} // データポイントのドットを非表示
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};