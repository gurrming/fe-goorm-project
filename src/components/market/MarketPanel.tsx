import { useState } from 'react';
import MarketSearchBar from './MarketSearchBar';
import MarketTableHeader from './MarketTableHeader';
import MarketTableItem from './MarketTableItem';
import MarketTableSkeleton from './MarketTableSkeleton';
import MarketTabs from './MarketTabs';
import { useGetCategories } from '../../api/useGetCategories';
import { useGetInvest } from '../../api/useGetInvest';
import { useMarketFavorites } from '../../hooks/market/useMarketFavorites';
import { useMarketFilteredData } from '../../hooks/market/useMarketFilteredData';
import { useMarketSort } from '../../hooks/market/useMarketSort';
import { useTicker } from '../../hooks/websocket/useTicker';
import useCategoryIdStore from '../../store/useCategoryId';
import useUserStore from '../../store/useUserStore';
import type { TabKey } from '../../types/market';

function MarketPanelEmptyMessage({ activeTab, isLoggedIn }: { activeTab: TabKey; isLoggedIn: boolean }) {
  const message =
    activeTab === 'holding'
      ? !isLoggedIn
        ? '로그인하면 내 보유자산을 확인할 수 있습니다.'
        : '표시할 종목이 없습니다.'
      : !isLoggedIn && activeTab === 'interest'
        ? '로그인하면 내 관심코인을 확인할 수 있습니다.'
        : '표시할 종목이 없습니다.';

  return (
    <div className="grid grid-cols-[1.5fr_1.2fr_1fr_1.3fr]">
      <div className="px-4 py-6 text-center col-span-4 text-xs text-primary-500">{message}</div>
    </div>
  );
}

export default function MarketPanel() {
  const { user } = useUserStore();
  const memberId = user?.id;
  const selectedCategoryId = useCategoryIdStore((state) => state.categoryId);
  const [activeTab, setActiveTab] = useState<TabKey>('krw');
  const [searchKeyword, setSearchKeyword] = useState('');
  const { sortTable, sortPriceArray, handleSortClick } = useMarketSort();
  const { isFavoriteCategory, handleToggleFavorite } = useMarketFavorites(memberId);

  // 마켓 전체 데이터 조회
  const { data: categories, isPending: isCategoriesPending } = useGetCategories();

  // 포트폴리오 - 보유 데이터 조회
  const { data: portfolio, isPending: isPortfolioPending } = useGetInvest(memberId!, 0, 30);

  const portfolioAssets = portfolio?.assetList ?? [];

  const { sortedCategories, sortedPortfolioAssets, tickerCategoryIds } = useMarketFilteredData({
    activeTab,
    searchKeyword,
    sortTable,
    sortPriceArray,
    categories,
    portfolioAssets,
    isFavoriteCategory,
  });

  useTicker(tickerCategoryIds.filter((id) => id !== selectedCategoryId));

  const hasHoldingData = sortedPortfolioAssets.length > 0;
  const hasCategoryData = sortedCategories.length > 0;

  const TabKeyFiltered = () => {
    if (activeTab === 'holding') {
      if (isPortfolioPending) return <MarketTableSkeleton />;
      if (!hasHoldingData) return <MarketPanelEmptyMessage activeTab={activeTab} isLoggedIn={!!user} />;
      return sortedPortfolioAssets.map((asset) => (
        <MarketTableItem
          key={asset.categoryId}
          activeTab={activeTab}
          portfolioAsset={asset}
          isFavorite={isFavoriteCategory(asset.categoryId)}
          onToggleFavorite={() => handleToggleFavorite(asset.categoryId)}
        />
      ));
    }

    if (isCategoriesPending) return <MarketTableSkeleton />;
    if (!hasCategoryData) return <MarketPanelEmptyMessage activeTab={activeTab} isLoggedIn={!!user} />;
    return sortedCategories.map((category) => (
      <MarketTableItem
        key={category.categoryId}
        activeTab={activeTab}
        category={category}
        isFavorite={isFavoriteCategory(category.categoryId)}
        onToggleFavorite={() => handleToggleFavorite(category.categoryId)}
      />
    ));
  };

  return (
    <div className="w-[400px] bg-white flex flex-col h-[calc(100vh)] mb-30">
      <MarketSearchBar searchKeyword={searchKeyword} onSearchKeywordChange={setSearchKeyword} />
      <MarketTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="w-full bg-white flex flex-col flex-1 min-h-0 overflow-hidden">
        <div className="bg-white overflow-x-hidden">
          <MarketTableHeader
            activeTab={activeTab}
            activeSortTable={sortTable}
            activeSortPriceArray={sortPriceArray}
            onSortClick={handleSortClick}
          />
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-1 min-h-0">{TabKeyFiltered()}</div>
      </div>
    </div>
  );
}
