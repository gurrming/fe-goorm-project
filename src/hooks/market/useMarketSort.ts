import { useState } from 'react';
import { getNextSortOrder } from '../../components/market/utils/marketSortUtils';
import type { SortTable, SortPriceArray } from '../../types/market';

export function useMarketSort() {
  const [sortTable, setSortTable] = useState<SortTable>('nowPrice');
  const [sortPriceArray, setSortPriceArray] = useState<SortPriceArray>('base');

  const handleSortClick = (item: SortTable) => {
    setSortTable((prev) => {
      if (prev === item) {
        setSortPriceArray((order) => getNextSortOrder(order));
        return prev;
      }
      setSortPriceArray('descending');
      return item;
    });
  };

  return { sortTable, sortPriceArray, handleSortClick };
}
