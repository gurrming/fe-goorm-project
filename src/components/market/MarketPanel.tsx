import { useState } from 'react';
import MarketSearchBar from './MarketSearchBar';
import MarketTableHeader from './MarketTableHeader';
import MarketTableItem from './MarketTableItem';
import MarketTabs from './MarketTabs';
import { mockHoldings, mockKrwMarketItems } from './mockData';
import type { TabKey, SortTable, SortPriceArray, MarketItem } from '../../types/market';

function getNextSortOrder(current: SortPriceArray): SortPriceArray {
  if (current === 'none') return 'descending';
  if (current === 'descending') return 'ascending';
  return 'none';
}

export default function MarketPanel() {
  const [activeTab, setActiveTab] = useState<TabKey>('krw');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [marketItems, setMarketItems] = useState<MarketItem[]>(mockKrwMarketItems);
  const [sortTable, setSortTable] = useState<SortTable>('lastPrice');
  const [sortPriceArray, setSortPriceArray] = useState<SortPriceArray>('none');

  // 탭별 필터링
  let Tab: MarketItem[] = [];
  if (activeTab === 'krw') {
    Tab = marketItems;
  } else if (activeTab === 'like') {
    Tab = marketItems.filter((marketItem) => marketItem.isFavorite);
  } else {
    const holdingItem = mockHoldings.map((holding) => holding.id);
    Tab = marketItems.filter((marketItem) => holdingItem.includes(marketItem.id));
  }

  // 검색 필터
  const keyword = searchKeyword.trim().toLowerCase();
  const searchFilteredItems = keyword
    ? Tab.filter((item) => item.symbol.toLowerCase().includes(keyword) || item.name.toLowerCase().includes(keyword))
    : Tab;

  // 정렬
  const sortedItems = (() => {
    // 정렬 필터가 none이면 서버에서 받아온 값 그대로 사용
    if (sortPriceArray === 'none') return searchFilteredItems;

    // descending이면 큰 수부터, ascending이면 작은 수부터 정렬
    return [...searchFilteredItems].sort(
      (a, b) => (a[sortTable] - b[sortTable]) * (sortPriceArray === 'descending' ? -1 : 1),
    );
  })();

  const handleSortClick = (item: SortTable) => {
    if (sortTable === item) {
      setSortPriceArray(getNextSortOrder(sortPriceArray));
    } else {
      setSortTable(item);
      setSortPriceArray('descending');
    }
  };

  // 좋아요 클릭 시 좋아요 필터
  const handleToggleFavorite = (marketId: number) => {
    setMarketItems((items) =>
      items.map((item) => (item.id === marketId ? { ...item, isFavorite: !item.isFavorite } : item)),
    );
  };

  return (
    <div className="w-[400px] bg-white flex flex-col h-[calc(100vh-120px)]">
      <MarketSearchBar searchKeyword={searchKeyword} onSearchKeywordChange={setSearchKeyword} />
      <MarketTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="w-full bg-white flex flex-col flex-1 min-h-0 overflow-hidden">
        <div className="bg-white overflow-x-hidden">
          <MarketTableHeader
            activeSortTable={sortTable}
            activeSortPriceArray={sortPriceArray}
            onSortClick={handleSortClick}
          />
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-1 min-h-0" style={{ height: 0 }}>
          {sortedItems.length === 0 ? (
            <div className="grid grid-cols-[1.5fr_1.2fr_1fr_1.3fr]">
              <div className="px-4 py-6 text-center text-primary-300- col-span-4 text-xs text-primary-500">
                표시할 종목이 없습니다.
              </div>
            </div>
          ) : (
            sortedItems.map((marketItem) => (
              <MarketTableItem
                key={marketItem.id}
                item={marketItem}
                onToggleFavorite={() => handleToggleFavorite(marketItem.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
