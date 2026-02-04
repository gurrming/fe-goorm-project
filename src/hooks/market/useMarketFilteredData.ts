import { getCategorySortValue, getHoldingSortValue, getSortDirection } from '../../lib/marketSortUtils';
import type { TAssets } from '../../types/asset';
import type { Category } from '../../types/category';
import type { TabKey, SortTable, SortPriceArray } from '../../types/market';

type ParamsType = {
  activeTab: TabKey;
  searchKeyword: string;
  sortTable: SortTable;
  sortPriceArray: SortPriceArray;
  categories: Category[] | undefined;
  portfolioAssets: TAssets[];
  isFavoriteCategory: (categoryId: number) => boolean;
};

export function useMarketFilteredData({
  activeTab,
  searchKeyword,
  sortTable,
  sortPriceArray,
  categories,
  portfolioAssets,
  isFavoriteCategory,
}: ParamsType) {
  const categoryList = categories ?? [];

  const filteredByTab = (() => {
    if (activeTab === 'krw') {
      return { categories: categoryList, portfolio: portfolioAssets };
    }
    if (activeTab === 'interest') {
      return {
        categories: categoryList.filter((c) => isFavoriteCategory(c.categoryId)),
        portfolio: [] as TAssets[],
      };
    }
    return { categories: [] as Category[], portfolio: portfolioAssets };
  })();

  const keyword = searchKeyword.trim().toLowerCase();
  const matchText = (symbol: string, name: string) =>
    !keyword || symbol.toLowerCase().includes(keyword) || name.toLowerCase().includes(keyword);

  const searchFiltered = {
    categories: keyword
      ? filteredByTab.categories.filter((category) => matchText(category.symbol, category.categoryName))
      : filteredByTab.categories,
    portfolio: keyword
      ? filteredByTab.portfolio.filter((category) => matchText(category.symbol, category.categoryName))
      : filteredByTab.portfolio,
  };

  const direction = getSortDirection(sortPriceArray);

  let sortedCategories: Category[];
  let sortedPortfolioAssets: TAssets[];

  if (direction === 0) {
    sortedCategories = searchFiltered.categories;
    sortedPortfolioAssets = searchFiltered.portfolio;
  } else if (activeTab === 'holding') {
    sortedCategories = [];
    sortedPortfolioAssets = [...searchFiltered.portfolio].sort((a, b) => {
      const aValue = getHoldingSortValue(a, sortTable);
      const bValue = getHoldingSortValue(b, sortTable);
      return (aValue - bValue) * direction;
    });
  } else {
    sortedPortfolioAssets = [];
    sortedCategories = [...searchFiltered.categories].sort((a, b) => {
      const aValue = getCategorySortValue(a, sortTable);
      const bValue = getCategorySortValue(b, sortTable);
      return (aValue - bValue) * direction;
    });
  }

  const tickerCategoryIds =
    activeTab === 'holding'
      ? sortedPortfolioAssets.map((a) => a.categoryId)
      : sortedCategories.map((c) => c.categoryId);

  return { sortedCategories, sortedPortfolioAssets, tickerCategoryIds };
}
