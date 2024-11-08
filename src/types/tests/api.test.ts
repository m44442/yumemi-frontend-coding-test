import '@jest/globals';
import { ApiResponse, APIError, GetPrefecturesResponse, PopulationTypes } from '../api';

describe('API型定義のテスト', () => {
  // APIResponseの型テスト
  test('ApiResponse型が正しく動作すること', () => {
    const response: ApiResponse<string> = {
      result: 'test',
      status: 200
    };
    expect(response.result).toBe('test');
    expect(response.status).toBe(200);
  });

  // APIErrorの型テスト
  test('APIError型が正しく動作すること', () => {
    const error: APIError = {
      statusCode: 404,
      message: 'Not Found'
    };
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('Not Found');
  });

  // GetPrefecturesResponseの型テスト
  test('GetPrefecturesResponse型が正しく動作すること', () => {
    const response: GetPrefecturesResponse = {
      result: {
        prefectures: [
          { prefCode: 1, prefName: '北海道' },
          { prefCode: 2, prefName: '青森県' }
        ]
      },
      status: 200
    };
    expect(response.result.prefectures).toHaveLength(2);
    expect(response.result.prefectures[0].prefCode).toBe(1);
  });

  // PopulationTypesの定数テスト
  test('PopulationTypesが正しい値を持つこと', () => {
    expect(PopulationTypes.TOTAL).toBe('総人口');
    expect(PopulationTypes.YOUNG).toBe('年少人口');
    expect(PopulationTypes.WORKING).toBe('生産年齢人口');
    expect(PopulationTypes.ELDERLY).toBe('老年人口');
  });
});