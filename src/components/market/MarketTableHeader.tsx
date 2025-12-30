import { faAngleDown, faAngleUp, faUpDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { SortTable, SortPriceArray } from '../../types/market';

type MarketTableHeaderProps = {
  activeSortTable: SortTable;
  activeSortPriceArray: SortPriceArray;
  onSortClick: (column: SortTable) => void;
};

function SortIcon({ sortPriceArray }: { sortPriceArray: SortPriceArray }) {
  if (sortPriceArray === 'descending')
    return <FontAwesomeIcon icon={faAngleDown} className="text-[8px] text-primary-300" />;
  if (sortPriceArray === 'ascending')
    return <FontAwesomeIcon icon={faAngleUp} className="text-[8px] text-primary-300" />;
  return <FontAwesomeIcon icon={faUpDown} className="text-[8px] text-primary-300" />;
}

export default function MarketTableHeader({
  activeSortTable,
  activeSortPriceArray,
  onSortClick,
}: MarketTableHeaderProps) {
  const getSortTable = (item: SortTable): SortPriceArray => {
    if (activeSortTable !== item) return 'none';
    return activeSortPriceArray;
  };

  return (
    <div className="grid grid-cols-[1.5fr_1.2fr_1fr_1.3fr] border-b border-t border-gray-200 bg-[#F7F7F7] px-4">
      <div className="py-3 text-left text-[11px] font-medium text-primary-300 min-w-0">종목명</div>
      <div
        className="py-3 text-right text-[11px] font-medium text-primary-300 hover:cursor-pointer select-none min-w-[90px]"
        onClick={() => onSortClick('lastPrice')}
      >
        <div className="flex items-center justify-end gap-1">
          <span>현재가</span>
          <span className="w-3 flex items-center justify-center">
            <SortIcon sortPriceArray={getSortTable('lastPrice')} />
          </span>
        </div>
      </div>
      <div
        className="py-3 text-right text-[11px] font-medium text-primary-300 hover:cursor-pointer select-none min-w-[80px]"
        onClick={() => onSortClick('changeRate')}
      >
        <div className="flex items-center justify-end gap-1">
          <span>전일대비</span>
          <span className="w-3 flex items-center justify-center">
            <SortIcon sortPriceArray={getSortTable('changeRate')} />
          </span>
        </div>
      </div>
      <div
        className="py-3 text-right text-[11px] font-medium text-primary-300 hover:cursor-pointer select-none min-w-[100px]"
        onClick={() => onSortClick('tradeAmount')}
      >
        <div className="flex items-center justify-end gap-1">
          <span>거래대금</span>
          <span className="w-3 flex items-center justify-center">
            <SortIcon sortPriceArray={getSortTable('tradeAmount')} />
          </span>
        </div>
      </div>
    </div>
  );
}
