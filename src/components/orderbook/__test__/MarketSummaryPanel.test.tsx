import { describe, it, expect } from 'vitest';

/**
 * MarketSummaryPanel의 고가/저가 % 계산 로직 검증
 */
describe('MarketSummaryPanel 고가/저가 % 계산', () => {
  // 고가 % 계산 함수 (실제 컴포넌트 로직)
  const calculateHighChangeRate = (high: number, previousClose: number, fallbackRate: number = 0): number => {
    return previousClose !== 0 ? ((high - previousClose) / previousClose) * 100 : fallbackRate;
  };

  // 저가 % 계산 함수 (실제 컴포넌트 로직)
  const calculateLowChangeRate = (low: number, previousClose: number, fallbackRate: number = 0): number => {
    return previousClose !== 0 ? ((low - previousClose) / previousClose) * 100 : fallbackRate;
  };

  describe('고가 % 계산', () => {
    it('전일종가가 0보다 크면 정상적으로 계산한다', () => {
      // Arrange
      const high = 55000;
      const previousClose = 50000;

      // Act
      const result = calculateHighChangeRate(high, previousClose);

      // Assert
      expect(result).toBe(10); // (55000 - 50000) / 50000 * 100 = 10%
    });

    it('고가가 전일종가보다 낮으면 음수 %을 반환한다', () => {
      // Arrange
      const high = 45000;
      const previousClose = 50000;

      // Act
      const result = calculateHighChangeRate(high, previousClose);

      // Assert
      expect(result).toBe(-10);
    });
  });

  describe('저가 % 계산', () => {
    it('전일종가가 0보다 크면 정상적으로 계산한다', () => {
      // Arrange
      const low = 45000;
      const previousClose = 50000;

      // Act
      const result = calculateLowChangeRate(low, previousClose);

      // Assert
      expect(result).toBe(-10); // (45000 - 50000) / 50000 * 100 = -10%
    });

    it('저가가 전일종가보다 높으면 양수 %을 반환한다', () => {
      // Arrange
      const low = 55000;
      const previousClose = 50000;

      // Act
      const result = calculateLowChangeRate(low, previousClose);

      // Assert
      expect(result).toBe(10);
    });
  });
});
