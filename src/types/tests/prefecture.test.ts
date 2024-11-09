import { prefectureApi } from '@/lib/api/prefecture';
import { apiClient } from '@/lib/api/client';

// APIクライアントのモック
jest.mock('@/lib/api/client', () => ({
  apiClient: {
    get: jest.fn()
  }
}));

describe('prefectureApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPrefectures', () => {
    it('都道府県一覧を正常に取得できること', async () => {
      const mockPrefectures = [
        { prefCode: 1, prefName: '北海道' },
        { prefCode: 2, prefName: '青森県' }
      ];

      (apiClient.get as jest.Mock).mockResolvedValue({
        data: { result: mockPrefectures }
      });

      const result = await prefectureApi.getPrefectures();

      expect(apiClient.get).toHaveBeenCalledWith('/api/v1/prefectures');
      expect(result).toEqual(mockPrefectures);
    });

    it('APIエラー時にエラーをスローすること', async () => {
      (apiClient.get as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(prefectureApi.getPrefectures()).rejects.toThrow('API Error');
    });

    it('不正なレスポンス形式の場合エラーをスローすること', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({ data: {} });

      await expect(prefectureApi.getPrefectures()).rejects.toThrow('APIレスポンスの形式が不正です');
    });
  });

  describe('getPopulation', () => {
    it('人口データを正常に取得できること', async () => {
      const prefCode = 1;
      const mockPrefectures = [
        { prefCode: 1, prefName: '北海道' }
      ];
      const mockPopulationData = {
        data: {
          result: {
            data: [{
              label: '総人口',
              data: [{ year: 2020, value: 5000000 }]
            }]
          }
        }
      };

      (apiClient.get as jest.Mock)
        .mockResolvedValueOnce(mockPopulationData)
        .mockResolvedValueOnce({ data: { result: mockPrefectures } });

      const result = await prefectureApi.getPopulation(prefCode);

      expect(apiClient.get).toHaveBeenCalledWith(
        '/api/v1/population/composition/perYear',
        { params: { prefCode } }
      );
      expect(result).toEqual({
        prefecture: mockPrefectures[0],
        population: [{
          label: '総人口',
          data: [{ year: 2020, value: 5000000 }]
        }]
      });
    });

    it('存在しない都道府県コードの場合エラーをスローすること', async () => {
      const mockPopulationData = {
        data: {
          result: {
            data: [{ label: '総人口', data: [] }]
          }
        }
      };

      (apiClient.get as jest.Mock)
        .mockResolvedValueOnce(mockPopulationData)
        .mockResolvedValueOnce({ data: { result: [] } });

      await expect(prefectureApi.getPopulation(999))
        .rejects
        .toThrow('都道府県が見つかりません');
    });
  });
});