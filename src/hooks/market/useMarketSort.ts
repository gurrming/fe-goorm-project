import { useCallback, useState } from 'react';
import { getNextSortOrder } from '../../lib/marketSortUtils';
import type { SortTable, SortPriceArray } from '../../types/market';

export function useMarketSort() {
  const [sortTable, setSortTable] = useState<SortTable>('nowPrice');
  const [sortPriceArray, setSortPriceArray] = useState<SortPriceArray>('base');

  const handleSortClick = useCallback((item: SortTable) => {
    setSortTable((prev) => {
      if (prev === item) {
        setSortPriceArray((order) => getNextSortOrder(order));
        return prev;
      }
      setSortPriceArray('descending');
      return item;
    });
  }, []);

  return { sortTable, sortPriceArray, handleSortClick };
}
