import { describe, it, expect } from 'vitest';

/**
 * MarketPanel의 정렬 순서 전환 로직
 */
type SortPriceArray = 'descending' | 'ascending' | 'base';

describe('getNextSortOrder', () => {
  // 정렬 순서 전환 함수
  const getNextSortOrder = (current: SortPriceArray): SortPriceArray => {
    if (current === 'base') return 'descending';
    if (current === 'descending') return 'ascending';
    return 'base';
  };

  it('base에서 내림차순으로 전환된다', () => {
    // Arrange
    const current: SortPriceArray = 'base';

    // Act
    const result = getNextSortOrder(current);

    // Assert
    expect(result).toBe('descending');
  });

  it('descending에서 오름차순으로 전환된다', () => {
    // Arrange
    const current: SortPriceArray = 'descending';

    // Act
    const result = getNextSortOrder(current);

    // Assert
    expect(result).toBe('ascending');
  });

  it('ascending에서 기본 배열로 전환된다', () => {
    // Arrange
    const current: SortPriceArray = 'ascending';

    // Act
    const result = getNextSortOrder(current);

    // Assert
    expect(result).toBe('base');
  });
});
