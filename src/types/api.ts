//都道府県の基本情報
export type prefecture = {
    prefCode: number;
    prefName: string;
}


//特定の年の人口データ
export type populationValue = {
    year: number;
    value: number;
}


//人口構成データのカテゴリ
export type populationCategory = {
    label: '総人口' | '年少人口' | '生産年齢人口' | '老年人口';
    data: populationValue[];
}


//都道府県ごとの人口データ
export type PrefecturePopulation = {
    prefecture: prefecture;
    population: populationCategory[];
}


//APIレスポンスの型
export type ApiResponse<T> = {
    message: string | null;
    result: T;
}


//都道府県一覧のAPIレスポンス
export type GetPrefecturesResponse = ApiResponse<prefecture[]>;


//人口構成のAPIレスポンス
export type PopulationCompositionPerYear = {
    boundaryYear: number;
    data: populationCategory[];
}

export type GetPopulationResponse = ApiResponse<PopulationCompositionPerYear>;


//人口データの種別
export const PopulationTypes = {
    TOTAL: '総人口',
    YOUNG: '年少人口',
    WORKING: '生産年齢人口',
    ELDERLY: '老年人口',
} as const;

export type PopulationDataType = typeof PopulationTypes[keyof typeof PopulationTypes];


//チャートデータのフォーマット用
export type ChartDataPoint = {
    year: number;
    [prefecture: string]: number | string;
}