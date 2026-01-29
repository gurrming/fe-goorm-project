import { useEffect, useMemo, useState } from 'react';
import { useGetAnalysis } from '@/api/useGetAnalysis';
import { useGetCategories } from '@/api/useGetCategories';
import useCategoryIdStore from '@/store/useCategoryId';

const COINS = ['BTC', 'ETH'] as const;

const normalizeSymbol = (value: string) => value.toUpperCase().replace(/[^A-Z]/g, '');

const getScoreColor = (score: number) => {
  if (score >= 0.6) return 'text-primary-700';
  if (score <= 0.4) return 'text-primary-900';
  return 'text-primary-100';
};

const toPercent = (value: number) => {
  const normalized = Math.min(1, Math.abs(value));
  return Math.round(normalized * 100);
};

const toScore = (value: number) => {
  if (Number.isNaN(value)) return 0;
  return Number(value.toFixed(3));
};

const getLabelText = (label: string) => {
  switch (label?.toUpperCase()) {
    case 'POSITIVE':
      return '긍정';
    case 'NEGATIVE':
      return '부정';
    case 'NEUTRAL':
      return '중립';
    default:
      return label || '미분류';
  }
};

export default function AIAnalysis() {
  const categoryId = useCategoryIdStore((state) => state.categoryId);
  const setCategoryId = useCategoryIdStore((state) => state.setCategoryId);
  const { data: aiData, isLoading, isError } = useGetAnalysis(categoryId);
  const { data: categories } = useGetCategories();
  const [selectedCoin, setSelectedCoin] = useState('BTC');

  useEffect(() => {
    if (!categories) return;
    const normalizedSelected = normalizeSymbol(selectedCoin);
    const matched = categories.find((item) => normalizeSymbol(item.symbol).endsWith(normalizedSelected));
    if (matched && matched.categoryId !== categoryId) {
      setCategoryId(matched.categoryId);
    }
  }, [categories, selectedCoin, categoryId, setCategoryId]);

  const selectedData = useMemo(() => {
    if (!aiData) return null;
    const normalizedSelected = normalizeSymbol(selectedCoin);
    return aiData.find((item) => normalizeSymbol(item.symbol).endsWith(normalizedSelected)) ?? null;
  }, [aiData, selectedCoin]);

  return (
    <div className="pt-24 px-64 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-primary-100">AI 감성 분석 결과</h1>
        <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg text-primary-300 text-sm">
          점수는 -1 ~ 1 범위입니다. 0에 가까울수록 중립이며, 양수는 긍정, 음수는 부정을 의미합니다.
        </div>

        {/* 코인 선택 버튼 */}
        <div className="flex gap-4 mb-8">
          {COINS.map((coin) => (
            <button
              key={coin}
              onClick={() => setSelectedCoin(coin)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCoin === coin
                  ? 'bg-[#003597] text-white'
                  : 'bg-white text-primary-300 border border-gray-200 hover:text-primary-100'
              }`}
            >
              {coin}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-primary-300">에이전트가 데이터를 분석 중입니다...</div>
        ) : isError ? (
          <div className="text-center py-20 text-primary-900">데이터를 불러오지 못했습니다.</div>
        ) : selectedData ? (
          <div className="flex flex-wrap gap-4">
            {/* 통합 심리 지수 */}
            <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-2 w-[360px]">
              <div className="flex items-center gap-4">
                <div className="text-primary-300 text-sm font-medium">통합 심리 지수</div>
                <div className={`text-xl font-extrabold ${getScoreColor(selectedData.totalResult)}`}>
                  {toScore(selectedData.totalResult)}
                </div>
                <span className="text-xs text-primary-500 bg-gray-50 border border-gray-200 rounded-full px-2 py-1">
                  {getLabelText(selectedData.totalLabel)}
                </span>
              </div>
              <p className="text-xs text-primary-500">뉴스(40%) + 커뮤니티(60%)를 합산한 종합 지표입니다.</p>
            </div>

            {/* 뉴스 감정 점수 */}
            <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-2 w-[360px]">
              <div className="flex items-center gap-4">
                <div className="text-primary-300 text-sm font-medium">뉴스 신뢰도</div>
                <div className="text-primary-100 font-bold">{toScore(selectedData.newsResult)}</div>
                <div className="w-28 bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full" style={{ width: `${toPercent(selectedData.newsResult)}%` }} />
                </div>
              </div>
              <p className="text-xs text-primary-500">뉴스 콘텐츠 분석으로 산출한 분위기 점수입니다.</p>
            </div>

            {/* 커뮤니티 열기 */}
            <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-2 w-[360px]">
              <div className="flex items-center gap-4">
                <div className="text-primary-300 text-sm font-medium">커뮤니티</div>
                <div className="text-primary-100 font-bold">{toScore(selectedData.communityResult)}</div>
                <div className="w-28 bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full" style={{ width: `${toPercent(selectedData.communityResult)}%` }} />
                </div>
              </div>
              <p className="text-xs text-primary-500">커뮤니티 반응을 반영한 분위기 점수입니다.</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-primary-300">데이터가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
