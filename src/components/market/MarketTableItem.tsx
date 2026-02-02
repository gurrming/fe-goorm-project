import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlashComparison from './FlashComparison';
import { formatChangePricePercentage } from '../../lib/price';
import useCategoryIdStore from '../../store/useCategoryId';
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
  const setCategoryId = useCategoryIdStore((state) => state.setCategoryId);
  const currentCategoryId = useCategoryIdStore((state) => state.categoryId);

  // 원화/관심 탭 행 티커
  const ticker = useTickerStore((state) => (category ? state.tickerByCategoryId[category.categoryId] : undefined));

  // 보유 탭일 때 다른 UI 표시
  if (activeTab === 'holding' && portfolioAsset) {
    // 서버에서 받은 값 그대로 사용, 불필요하게 프론트에서 가공해서 넣은 값 뺌
    const evaluateAmount = portfolioAsset.evaluationAmount;
    const profit = portfolioAsset.evaluationProfit;
    const profitRate = portfolioAsset.profitRate;

    const profitColor = profitRate > 0 ? 'text-primary-700' : profitRate < 0 ? 'text-primary-900' : 'text-primary-100';
    const profitPrefix = profitRate > 0 ? '+' : '';
    const rightAlignClass = 'flex justify-end items-center';
    const isCurrentItem = currentCategoryId === portfolioAsset.categoryId;

    return (
      // 보유 탭입니다
      <div
        className={`grid grid-cols-[1.5fr_1.2fr_2.5fr_1.3fr] border-b border-gray-200 hover:bg-gray-100 px-4 ${
          isCurrentItem ? 'bg-gray-100' : ''
        }`}
        onClick={() => setCategoryId(portfolioAsset.categoryId)}
      >
        <div className="text-xs min-w-0 flex ">
          <div className="flex items-center gap-2 font-bold py-4">
            {/* 종목 심볼 */}
            <span className="text-[14px] text-primary-100">{portfolioAsset.symbol}</span>
          </div>
        </div>
        <div className={`text-xs text-right text-primary-100 min-w-[90px] ${rightAlignClass}`}>
          <div className="flex flex-col">
            {/* 보유 수량 */}
            <span className="font-semibold">{formatQuantity(portfolioAsset.investCount)}</span>
            <span className="text-[11px] text-primary-300 font-normal">
              {/* 보유 금액 한국 돈으로 바꿨을 때 */}
              {Math.round(evaluateAmount).toLocaleString('ko-KR')}
              <span className="text-[11px] text-primary-500 font-normal ml-1">KRW</span>
            </span>
          </div>
        </div>
        <div className={`text-xs text-right text-primary-100 font-semibold min-w-[80px] ${rightAlignClass}`}>
          <div className="flex flex-col">
            {/* 매수 평균 가격 */}
            <span>{portfolioAsset.avgPrice.toLocaleString('ko-KR')}</span>
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
            <span className="text-[11px]">{Math.round(profit).toLocaleString('ko-KR')}</span>
          </div>
        </div>
      </div>
    );
  }

  // 기본 탭 (원화, 관심)
  if (!category) return null;
  const isCurrentItem = currentCategoryId === category.categoryId;

  // 실시간 데이터가 없으면 category의 REST API에서 받아온 값 사용
  const lastPrice = ticker?.price ?? category.tradePrice ?? 0;
  const changeRate = ticker?.changeRate ?? category.changeRate ?? 0;
  const tradeAmount = ticker?.amount ?? category.accAmount ?? 0;
  const isLiveTicker = !!ticker;
  const changePricePercentage = formatChangePricePercentage(changeRate);

  return (
    <div
      className={`grid grid-cols-[1.5fr_1.2fr_1fr_1.3fr] border-b border-gray-200 hover:bg-gray-100 px-4 py-2 transition-opacity hover:cursor-pointer ${
        isCurrentItem ? 'bg-gray-100' : ''
      }`}
      onClick={() => setCategoryId(category.categoryId)}
    >
      <div className="text-xs min-w-0">
        <div className="flex items-center gap-2">
          {/* 관심 종목 추가/삭제 버튼 */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="w-5 h-5 flex items-center justify-center text-[#ffca43] hover:text-[#ffb457] shrink-0"
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
      <FlashComparison
        value={isLiveTicker ? lastPrice : null}
        enabled={isLiveTicker}
        className={`text-xs text-right min-w-[90px] font-semibold ${changePricePercentage.textStyle} rounded-[2px]`}
      >
        {lastPrice.toLocaleString('ko-KR')}
      </FlashComparison>
      <div className={`text-xs text-right min-w-[80px] font-semibold ${changePricePercentage.textStyle}`}>
        {changePricePercentage.text}%
      </div>
      <div className="text-xs text-right text-primary-100 font-semibold min-w-[100px]">
        {formatTradeAmountKRW(tradeAmount)}
        <span className="text-primary-500 font-normal">백만</span>
      </div>
    </div>
  );
}
