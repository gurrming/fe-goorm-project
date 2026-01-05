import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { MarketItem } from '../../types/market';

type MarketTableItemProps = {
  item: MarketItem;
  onToggleFavorite: () => void;
};

function formatTradeAmountKRW(tradeAmount: number) {
  const million = tradeAmount / 1000000;
  return `${Math.round(million).toLocaleString('ko-KR')}`;
}

export default function MarketTableItem({ item, onToggleFavorite }: MarketTableItemProps) {
  // + 이면 primary-700, - 이면 primary-900, 그냥 변동사항 없으면 primary-100
  const changeColor =
    item.changeRate > 0 ? 'text-primary-700' : item.changeRate < 0 ? 'text-primary-900' : 'text-primary-100';
  const changePrefix = item.changeRate > 0 ? '+' : '';

  return (
    <div className="grid grid-cols-[1.5fr_1.2fr_1fr_1.3fr] border-b border-gray-200 hover:bg-gray-50 px-4">
      <div className="py-3 text-xs min-w-0">
        <div className="flex items-center gap-2">
          {/* 관심 종목 추가/삭제 버튼 */}
          <button
            type="button"
            onClick={onToggleFavorite}
            className="w-5 h-5 flex items-center justify-center text-primary-500 hover:text-primary-300 shrink-0"
          >
            <FontAwesomeIcon icon={item.isFavorite ? faStarSolid : faStarRegular} />
          </button>
          {/* 종목명 심볼 표시 */}
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-semibold text-primary-100">{item.name}</span>
            <span className="text-[11px] text-primary-300">
              {item.symbol}/{item.quote}
            </span>
          </div>
        </div>
      </div>
      <div className={`py-3 text-xs text-right min-w-[90px] font-semibold ${changeColor}`}>
        {item.lastPrice.toLocaleString('ko-KR')}
      </div>
      <div className={`py-3 text-xs text-right min-w-[80px] font-semibold ${changeColor}`}>
        {changePrefix}
        {item.changeRate.toFixed(2)}%
      </div>
      <div className="py-3 text-xs text-right text-primary-100 font-semibold min-w-[100px]">
        {formatTradeAmountKRW(item.tradeAmount)} <span className="text-primary-500 font-normal">백만</span>
      </div>
    </div>
  );
}
