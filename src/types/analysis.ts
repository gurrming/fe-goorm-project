export type TAnalysis = {
  symbol: string;
  totalResult: number;     // 0~100
  totalLabel: string;      // BUY, SELL, HOLD
  newsResult: number;
  communityResult: number;
  summary: string;         // 한 줄 요약
  rsi: number;             // RSI 지표
  fullReport: string;      // 상세 리포트 (Markdown)
};