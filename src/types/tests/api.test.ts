import '@jest/globals';
import { ApiResponse, GetPrefecturesResponse, GetPopulationResponse, PopulationTypes } from '../api';

describe('API型定義のテスト', () => {
  // ApiResponseの型テスト
  test('ApiResponse型が正しく動作すること', () => {
    const response: ApiResponse<string> = {
      message: null,
      result: 'test'
    };
    expect(response.result).toBe('test');
    expect(response.message).toBeNull();
  });

  // GetPrefecturesResponseの型テスト
  test('GetPrefecturesResponse型が正しく動作すること', () => {
    const response: GetPrefecturesResponse = {
      message: null,
      result: [
        { prefCode: 1, prefName: '北海道' },
        { prefCode: 2, prefName: '青森県' }
      ]
    };
    expect(response.result).toHaveLength(2);
    expect(response.result[0].prefCode).toBe(1);
  });

  // GetPopulationResponseの型テスト
  test('GetPopulationResponse型が正しく動作すること', () => {
    const response: GetPopulationResponse = {
      message: null,
      result: {
        boundaryYear: 2020,
        data: [
          {
            label: '総人口',
            data: [
              { year: 2020, value: 5000000 },
              { year: 2021, value: 4900000 }
            ]
          }
        ]
      }
    };
    expect(response.result.boundaryYear).toBe(2020);
    expect(response.result.data).toHaveLength(1);
    expect(response.result.data[0].label).toBe('総人口');
    expect(response.result.data[0].data[0].year).toBe(2020);
  });

  // PopulationTypesの定数テスト
  test('PopulationTypesが正しい値を持つこと', () => {
    expect(PopulationTypes.TOTAL).toBe('総人口');
    expect(PopulationTypes.YOUNG).toBe('年少人口');
    expect(PopulationTypes.WORKING).toBe('生産年齢人口');
    expect(PopulationTypes.ELDERLY).toBe('老年人口');
  });
});