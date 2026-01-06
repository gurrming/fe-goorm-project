import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Category, PortfolioAsset, TabKey } from '../../types/market';

type MarketTableItemProps = {
  activeTab: TabKey;
  category?: Category;
  portfolioAsset?: PortfolioAsset;
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
      <div className="grid grid-cols-[1.5fr_1.2fr_1fr_1.3fr] border-b border-gray-200 hover:bg-gray-50 px-4">
        <div className="text-xs min-w-0 flex ">
          <div className="flex items-center gap-2 font-bold py-4">
            {/* 종목 심볼 */}
            <span className="text-[14px] text-primary-100">{portfolioAsset.categorySymbol}</span>
          </div>
        </div>
        <div className={`text-xs text-right text-primary-100 min-w-[90px] ${rightAlignClass}`}>
          <div className="flex flex-col">
            <span className="font-semibold">{formatQuantity(portfolioAsset.quantity)}</span>
            <span className="text-[11px] text-primary-300 font-normal">
              {portfolioAsset.evaluateAmount.toLocaleString('ko-KR')}
              <span className="text-[11px] text-primary-500 font-normal ml-1">KRW</span>
            </span>
          </div>
        </div>
        <div className={`text-xs text-right text-primary-100 font-semibold min-w-[80px] ${rightAlignClass}`}>
          <div className="flex flex-col">
            <span>{portfolioAsset.avgBuyPrice.toLocaleString('ko-KR')}</span>
            <span className="text-[11px] text-primary-500 font-normal">KRW</span>
          </div>
        </div>
        <div className={`text-xs text-right min-w-[100px] font-semibold ${profitColor} ${rightAlignClass}`}>
          <div className="flex flex-col">
            <span>
              {profitPrefix}
              {profitRate.toFixed(2)}%
            </span>
            <span className="text-[11px]">
              {profitPrefix}
              {Math.abs(portfolioAsset.profit).toLocaleString('ko-KR')}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 기본 탭 (원화, 관심)
  if (!category) return null;

  // lastPrice, changeRate, tradeAmount는 다른 API에서 받아와서 병합 예정
  // 현재는 임시로 0으로 표시
  const lastPrice = 0;
  const changeRate = 0;
  const tradeAmount = 0;

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
            <span className="text-[11px] text-primary-300">{category.categorySymbol}/(KRW)</span>
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
