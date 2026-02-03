import type { TAssets } from '../../../types/asset';
import type { Category } from '../../../types/category';
import type { SortTable, SortPriceArray } from '../../../types/market';

export function getNextSortOrder(current: SortPriceArray): SortPriceArray {
  if (current === 'base') return 'descending';
  if (current === 'descending') return 'ascending';
  return 'base';
}

export function getCategorySortValue(category: Category, sortTable: SortTable): number {
  switch (sortTable) {
    case 'lastPrice':
      return category.tradePrice ?? 0;
    case 'changeRate':
      return category.changeRate ?? 0;
    case 'tradeAmount':
      return category.accAmount ?? 0;
    default:
      return 0;
  }
}

export function getHoldingSortValue(asset: TAssets, sortTable: SortTable): number {
  switch (sortTable) {
    case 'evaluateAmount':
      return asset.evaluationAmount ?? 0;
    case 'avgBuyPrice':
      return asset.avgPrice ?? 0;
    case 'profitRate':
      return asset.profitRate ?? 0;
    default:
      return 0;
  }
}

//  오름차순 1, 내림차순 -1, base 0
export function getSortDirection(sortPriceArray: SortPriceArray): number {
  return sortPriceArray === 'ascending' ? 1 : sortPriceArray === 'descending' ? -1 : 0;
}
