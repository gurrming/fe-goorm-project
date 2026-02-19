import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown'; 
import { getAnalysis } from '@/api/useGetAnalysis';
import { useGetCategories } from '@/api/useGetCategories';
import useCategoryIdStore from '@/store/useCategoryId';
import { useQuery } from '@tanstack/react-query';

// --- 설정 및 유틸리티 ---
const COINS = ['BTC', 'ETH', 'SOL', 'XRP'] as const;

const normalizeSymbol = (value: string) => value.toUpperCase().replace(/[^A-Z]/g, '');

const formatScore = (value: number | undefined) => {
  if (value === undefined || Number.isNaN(value)) return 0;
  const score = value <= 1.0 ? value * 100 : value;
  return Math.round(score);
};

// [색상 강화] 더 진하고 선명한 색상 사용
const getSignalColorClass = (label: string, score: number) => {
  const safeLabel = label?.toUpperCase();
  if (safeLabel === 'BUY') return 'text-[#C84A31]'; // 업비트 빨강 (진함)
  if (safeLabel === 'SELL') return 'text-[#1261C4]'; // 업비트 파랑 (진함)
  return score >= 50 ? 'text-[#C84A31]' : 'text-[#1261C4]';
};

const getSignalBadgeStyle = (label: string, score: number) => {
  const safeLabel = label?.toUpperCase();
  // 배경색도 조금 더 진하게 조정
  if (safeLabel === 'BUY') return 'bg-[#FEF0EF] text-[#C84A31] border-[#C84A31]';
  if (safeLabel === 'SELL') return 'bg-[#F1F5FF] text-[#1261C4] border-[#1261C4]';
  
  return score >= 50 
    ? 'bg-[#FEF0EF] text-[#C84A31] border-[#C84A31]'
    : 'bg-[#F1F5FF] text-[#1261C4] border-[#1261C4]';
};

const getLabelText = (label: string) => {
  switch (label?.toUpperCase()) {
    case 'BUY': return '강력 매수';
    case 'SELL': return '매도 시그널';
    case 'HOLD': return '관망 (HOLD)';
    default: return '분석 중';
  }
};

const getSentimentText = (score: number) => {
  if (score >= 60) return '긍정적 호재';
  if (score <= 40) return '부정적 악재';
  return '중립적';
};

// --- 컴포넌트 시작 ---
export default function AIAnalysis() {
  const categoryId = useCategoryIdStore((state) => state.categoryId);
  const setCategoryId = useCategoryIdStore((state) => state.setCategoryId);
  const { data: aiData, isLoading, isError } = useQuery({
    queryKey: ['analysis', categoryId],
    queryFn: () => getAnalysis(categoryId),
    refetchInterval: 60000,
    refetchIntervalInBackground: true, 
    refetchOnWindowFocus: true, // 사용자가 탭을 다시 클릭했을 때도 갱신
  });  
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

  const score = useMemo(() => formatScore(selectedData?.totalResult), [selectedData]);

  const gaugeRotation = useMemo(() => {
    return (score / 100) * 180 - 90; 
  }, [score]);

  // [수정] 게이지 테두리 색상도 진하게
  const gaugeColorClass = useMemo(() => {
    if (!selectedData) return 'border-gray-200';
    if (score >= 50) return 'border-l-[#C84A31] border-t-[#C84A31]';
    return 'border-r-[#1261C4] border-t-[#1261C4]';
  }, [score, selectedData]);

  const auraClass = useMemo(() => {
     if (score >= 50) return 'from-red-500 to-orange-500';
     return 'from-blue-500 to-cyan-500';
  }, [score]);

  return (
    <div className="pt-10 px-4 md:px-8 pb-20 min-h-screen bg-[#F4F5F8]">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* === 헤더 === */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
           <div className="flex gap-2 mb-4 md:mb-0">
             {COINS.map((coin) => (
                <button
                  key={coin}
                  onClick={() => setSelectedCoin(coin)}
                  className={`px-6 py-2.5 rounded-lg font-bold transition-all text-sm ${
                    selectedCoin === coin
                      ? 'bg-[#0A264F] text-white shadow-md' // 더 진한 네이비색
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {coin}
                </button>
             ))}
           </div>
           <div className="text-right">
              <div className="text-xs text-gray-400 mb-1 flex items-center justify-end gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                실시간 분석 중 ({new Date().toLocaleTimeString()})
              </div>
              <div className="text-2xl font-extrabold text-gray-900 tracking-tight">
                {selectedCoin} <span className="text-sm font-medium text-gray-500">AI Report</span>
              </div>
           </div>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-[#0A264F] rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-medium animate-pulse">AI가 데이터를 분석하고 있습니다...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-white rounded-xl text-red-500 shadow-sm border border-red-100">
            데이터를 불러오지 못했습니다.
          </div>
        ) : selectedData ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* A. 종합 점수 & 캐릭터 */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                {/* 오라 효과 강화 */}
                <div className={`absolute top-0 left-0 w-full h-1.5 opacity-80 bg-gradient-to-r ${auraClass}`}></div>
                
                <div className="mb-6 transform transition-transform group-hover:scale-110 duration-500">
                  {score >= 50 ? (
                    <div className="text-[7rem] leading-none drop-shadow-md">🐂</div> 
                  ) : (
                    <div className="text-[7rem] leading-none drop-shadow-md">🐻</div>
                  )}
                </div>

                <h3 className={`text-3xl font-black mb-2 tracking-tight ${getSignalColorClass(selectedData.totalLabel, score)}`}>
                  {getLabelText(selectedData.totalLabel)}
                </h3>
                <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold border mb-8 shadow-sm ${getSignalBadgeStyle(selectedData.totalLabel, score)}`}>
                  AI 확신도 {score}%
                </div>

                {/* 게이지 차트 */}
                <div className="relative w-52 h-26 overflow-hidden mt-2">
                  <div className="absolute w-52 h-52 bg-gray-100 rounded-full border-[24px] border-gray-100 box-border top-0 left-0"></div>
                  <div 
                    className={`absolute w-52 h-52 rounded-full border-[24px] box-border top-0 left-0 border-transparent ${gaugeColorClass}`}
                    style={{ transform: `rotate(${gaugeRotation}deg)`, transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
                  ></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-3xl font-black text-gray-800">
                    {score}
                  </div>
                </div>
              </div>

              {/* B. 팩터 분석 */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                 
                 {/* 요약 카드 */}
                 <div className="sm:col-span-2 bg-gradient-to-r from-[#F8F9FD] to-white p-6 rounded-xl border-l-[6px] border-l-[#0A264F] border border-gray-200 shadow-sm flex flex-col justify-center">
                    <span className="text-[#0A264F] font-bold text-xs tracking-widest mb-3 flex items-center gap-2">
                      <span>📢</span> AI ONE-LINE SUMMARY
                    </span>
                    <p className="text-lg font-bold text-gray-800 leading-relaxed break-keep">
                      "{selectedData.summary || '현재 요약된 정보가 없습니다.'}"
                    </p>
                 </div>

                 {/* RSI 카드 (설명 툴팁 추가 & 색상 강화) */}
                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative group overflow-visible">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 mb-1 cursor-help relative group/tooltip">
                          <h4 className="text-gray-600 font-bold text-sm">RSI (상대강도지수)</h4>
                          {/* 물음표 아이콘 */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                            <circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>
                          </svg>
                          
                          {/* [기능 추가] RSI 툴팁 설명 */}
                          <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity z-50 pointer-events-none">
                            <p className="font-bold mb-1 text-yellow-400">RSI란?</p>
                            <p>가격의 상승압력과 하락압력 간의 상대적인 강도를 나타냅니다.</p>
                            <div className="mt-2 grid grid-cols-2 gap-2 text-[10px]">
                              <span className="text-blue-300">▼ 30이하: 과매도 (매수기회)</span>
                              <span className="text-red-300">▲ 70이상: 과매수 (과열주의)</span>
                            </div>
                            <div className="absolute bottom-[-6px] left-4 w-3 h-3 bg-gray-900 transform rotate-45"></div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400">시장 과열 여부 판단</p>
                      </div>
                      
                      <span className={`text-2xl font-black ${selectedData.rsi > 70 ? 'text-[#C84A31]' : selectedData.rsi < 30 ? 'text-[#1261C4]' : 'text-gray-800'}`}>
                        {selectedData.rsi?.toFixed(1)}
                      </span>
                    </div>

                    {/* RSI Bar (Gradient 강화) */}
                    <div className="relative mb-6">
                        <div className="w-full h-4 bg-gradient-to-r from-[#1261C4] via-gray-200 to-[#C84A31] rounded-full opacity-30"></div>
                        
                        {/* 30/70 기준선 */}
                        <div className="absolute top-0 bottom-0 left-[30%] w-0.5 bg-white z-10"></div>
                        <div className="absolute top-0 bottom-0 left-[70%] w-0.5 bg-white z-10"></div>
                        
                        {/* 현재 위치 마커 */}
                        <div 
                           className={`absolute top-[-4px] h-6 w-1 rounded bg-gray-900 shadow-lg transition-all duration-700 z-20`}
                           style={{left: `${Math.min(Math.max(selectedData.rsi, 0), 100)}%`}}
                        >
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold bg-gray-900 text-white px-1.5 py-0.5 rounded">
                                {selectedData.rsi?.toFixed(0)}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                       <span className="text-[#1261C4]">Oversold (Buy)</span>
                       <span className="text-gray-400">Neutral</span>
                       <span className="text-[#C84A31]">Overbought (Sell)</span>
                    </div>
                 </div>

                 {/* 뉴스/커뮤니티 (프로그레스 바 강화) */}
                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h4 className="text-gray-600 font-bold text-sm mb-6 flex items-center gap-2">
                       시장 심리 데이터
                       <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">24시간 기준</span>
                    </h4>
                    
                    {/* 뉴스 */}
                    <div className="mb-6">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-500 font-medium">뉴스 긍정/부정</span>
                        <span className={`font-bold ${formatScore(selectedData.newsResult) >= 50 ? 'text-[#C84A31]' : 'text-[#1261C4]'}`}>
                          {formatScore(selectedData.newsResult)}점 
                          <span className="text-gray-400 font-normal ml-1">({getSentimentText(formatScore(selectedData.newsResult))})</span>
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-[#1261C4] h-full transition-all duration-1000" style={{ width: `${Math.min(formatScore(selectedData.newsResult), 100)}%` }} />
                      </div>
                    </div>

                    {/* 커뮤니티 */}
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-500 font-medium">커뮤니티 반응</span>
                         <span className={`font-bold ${formatScore(selectedData.communityResult) >= 50 ? 'text-[#C84A31]' : 'text-[#1261C4]'}`}>
                          {formatScore(selectedData.communityResult)}점
                          <span className="text-gray-400 font-normal ml-1">({getSentimentText(formatScore(selectedData.communityResult))})</span>
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-[#C84A31] h-full transition-all duration-1000" style={{ width: `${Math.min(formatScore(selectedData.communityResult), 100)}%` }} />
                      </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* 상세 리포트 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mt-6">
              <h4 className="font-bold text-gray-900 text-xl mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <span className="text-2xl">📝</span> AI 투자 분석 리포트
              </h4>
              <div className="prose prose-sm md:prose-base max-w-none text-gray-600 bg-gray-50 p-8 rounded-xl border border-gray-200
                prose-headings:font-bold prose-headings:text-gray-900 prose-h3:text-lg prose-h3:mb-3 prose-p:leading-7 
                prose-strong:text-[#0A264F] prose-strong:bg-blue-50 prose-strong:px-1 prose-li:marker:text-blue-500">
                {selectedData.fullReport ? (
                   <ReactMarkdown>{selectedData.fullReport}</ReactMarkdown>
                ) : (
                   <p className="text-gray-400 text-center py-10">상세 리포트 데이터가 없습니다.</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-40 text-gray-400">데이터가 없습니다.</div>
        )}

        <footer className="mt-12 py-8 px-6 bg-white border border-gray-200 rounded-xl text-center">
          <p className="text-sm font-bold text-gray-500 mb-2">⚠️ 투자 유의사항</p>
          <p className="text-xs text-gray-400 leading-relaxed max-w-2xl mx-auto">
            본 서비스("HeartBit AI")가 제공하는 모든 분석 정보는 뉴스 데이터와 기술적 지표를 기반으로 한 단순 참고 자료입니다. 
            모든 투자의 책임은 투자자 본인에게 있으며, AI의 예측은 시장 상황에 따라 실제 결과와 다를 수 있습니다.
          </p>
        </footer>
      </div>
    </div>
  );
}