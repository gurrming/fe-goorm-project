import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTickerStore } from '../../store/websocket/useTickerStore';
import type { TAssets } from '../../types/asset';
import type { Category } from '../../types/category';
import type { TabKey } from '../../types/market';

type MarketTableItemProps = {
  activeTab: TabKey;
  category?: Category;
  portfolioAsset?: TAssets;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

function formatTradeAmountKRW(tradeAmount: number) {
  const million = tradeAmount / 1000000;
  return `${Math.round(million).toLocaleString('ko-KR')}`;
}

function formatQuantity(quantity: number) {
  return quantity.toLocaleString('ko-KR', { maximumFractionDigits: 8 });
}

export default function MarketTableItem({
  activeTab,
  category,
  portfolioAsset,
  isFavorite,
  onToggleFavorite,
}: MarketTableItemProps) {
  // 보유 탭일 때 다른 UI 표시
  if (activeTab === 'holding' && portfolioAsset) {
    // 수익률 계산 (profitRate가 없으면 계산)
    const profitRate =
      portfolioAsset.profitRate ??
      (portfolioAsset.buyAmount > 0 ? (portfolioAsset.profit / portfolioAsset.buyAmount) * 100 : 0);
    const profitColor = profitRate > 0 ? 'text-primary-700' : profitRate < 0 ? 'text-primary-900' : 'text-primary-100';
    const profitPrefix = profitRate > 0 ? '+' : '';
    const rightAlignClass = 'flex justify-end items-center';

    return (
      // 보유 탭입니다
      <div className="grid grid-cols-[1.5fr_1.2fr_1fr_1.3fr] border-b border-gray-200 hover:bg-gray-50 px-4">
        <div className="text-xs min-w-0 flex ">
          <div className="flex items-center gap-2 font-bold py-4">
            {/* 종목 심볼 */}
            <span className="text-[14px] text-primary-100">{portfolioAsset.symbol}</span>
          </div>
        </div>
        <div className={`text-xs text-right text-primary-100 min-w-[90px] ${rightAlignClass}`}>
          <div className="flex flex-col">
            {/* 보유 수량 */}
            <span className="font-semibold">{formatQuantity(portfolioAsset.quantity)}</span>
            <span className="text-[11px] text-primary-300 font-normal">
              {/* 보유 금액 한국 돈으로 바꿨을 때 */}
              {portfolioAsset.evaluateAmount.toLocaleString('ko-KR')}
              <span className="text-[11px] text-primary-500 font-normal ml-1">KRW</span>
            </span>
          </div>
        </div>
        <div className={`text-xs text-right text-primary-100 font-semibold min-w-[80px] ${rightAlignClass}`}>
          <div className="flex flex-col">
            {/* 매수 평균 가격 */}
            <span>{portfolioAsset.avgBuyPrice.toLocaleString('ko-KR')}</span>
            <span className="text-[11px] text-primary-500 font-normal">KRW</span>
          </div>
        </div>
        <div className={`text-xs text-right min-w-[100px] font-semibold ${profitColor} ${rightAlignClass}`}>
          {/* 수익률 */}
          <div className="flex flex-col">
            <span>
              {profitPrefix}
              {profitRate.toFixed(2)}%
            </span>
            <span className="text-[11px]">{portfolioAsset.profit.toLocaleString('ko-KR')}</span>
          </div>
        </div>
      </div>
    );
  }

  // 기본 탭 (원화, 관심)
  if (!category) return null;

  // /topic/ticker에서 데이터 가져옴
  const { tickerData } = useTickerStore();
  const lastPrice = tickerData?.price ?? 0;
  const changeRate = tickerData?.changeRate ?? 0;
  const tradeAmount = tickerData?.amount ?? 0;

  // + 이면 primary-700, - 이면 primary-900, 그냥 변동사항 없으면 primary-100
  const changeColor = changeRate > 0 ? 'text-primary-700' : changeRate < 0 ? 'text-primary-900' : 'text-primary-100';
  const changePrefix = changeRate > 0 ? '+' : '';

  return (
    <div className="grid grid-cols-[1.5fr_1.2fr_1fr_1.3fr] border-b border-gray-200 hover:bg-gray-50 px-4">
      <div className="text-xs min-w-0">
        <div className="flex items-center gap-2">
          {/* 관심 종목 추가/삭제 버튼 */}
          <button
            type="button"
            onClick={onToggleFavorite}
            className="w-5 h-5 flex items-center justify-center text-primary-500 hover:text-primary-300 shrink-0"
          >
            <FontAwesomeIcon icon={isFavorite ? faStarSolid : faStarRegular} />
          </button>
          {/* 종목명 심볼 표시 */}
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-semibold text-primary-100">{category.categoryName}</span>
            <span className="text-[11px] text-primary-300">{category.symbol}/(KRW)</span>
          </div>
        </div>
      </div>
      <div className={`text-xs text-right min-w-[90px] font-semibold ${changeColor}`}>
        {lastPrice.toLocaleString('ko-KR')}
      </div>
      <div className={`text-xs text-right min-w-[80px] font-semibold ${changeColor}`}>
        {changePrefix}
        {changeRate.toFixed(2)}%
      </div>
      <div className="text-xs text-right text-primary-100 font-semibold min-w-[100px]">
        {formatTradeAmountKRW(tradeAmount)} <span className="text-primary-500 font-normal">백만</span>
      </div>
    </div>
  );
}
