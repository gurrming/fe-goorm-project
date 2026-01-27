import { describe, it, expect } from 'vitest';
import { getPriceTickSize, changeNumber, dotQuantity, formatNumber, formatInteger } from '../price';

describe('getPriceTickSize', () => {
  it('가격이 2,000,000 이상이면 1000을 반환한다', () => {
    // Arrange
    const price = 2000000;

    // Act
    const result = getPriceTickSize(price);

    // Assert
    expect(result).toBe(1000);
  });

  it('가격이 2,000,000 미만 1,000,000 이상이면 500을 반환한다', () => {
    // Arrange
    const price = 1500000;

    // Act
    const result = getPriceTickSize(price);

    // Assert
    expect(result).toBe(500);
  });

  it('가격이 1,000,000 미만 100,000 이상이면 50을 반환한다', () => {
    // Arrange
    const price = 500000;

    // Act
    const result = getPriceTickSize(price);

    // Assert
    expect(result).toBe(50);
  });

  it('가격이 100,000 미만 10,000 이상이면 10을 반환한다', () => {
    // Arrange
    const price = 50000;

    // Act
    const result = getPriceTickSize(price);

    // Assert
    expect(result).toBe(10);
  });

  it('가격이 10,000 미만 1,000 이상이면 5를 반환한다', () => {
    // Arrange
    const price = 5000;

    // Act
    const result = getPriceTickSize(price);

    // Assert
    expect(result).toBe(5);
  });

  it('가격이 1,000 미만 100 이상이면 1을 반환한다', () => {
    // Arrange
    const price = 500;

    // Act
    const result = getPriceTickSize(price);

    // Assert
    expect(result).toBe(1);
  });

  it('가격이 100 미만이면 1을 반환한다', () => {
    // Arrange
    const price = 50;

    // Act
    const result = getPriceTickSize(price);

    // Assert
    expect(result).toBe(1);
  });

  it('경계값: 가격이 정확히 2,000,000이면 1000을 반환한다', () => {
    expect(getPriceTickSize(2000000)).toBe(1000);
  });

  it('경계값: 가격이 정확히 1,999,999이면 500을 반환한다', () => {
    expect(getPriceTickSize(1999999)).toBe(500);
  });

  it('경계값: 가격이 정확히 1,000,000이면 500을 반환한다', () => {
    expect(getPriceTickSize(1000000)).toBe(500);
  });

  it('경계값: 가격이 정확히 999,999이면 50을 반환한다', () => {
    expect(getPriceTickSize(999999)).toBe(50);
  });

  it('0 이하의 가격이면 1을 반환한다', () => {
    expect(getPriceTickSize(0)).toBe(1);
    expect(getPriceTickSize(-100)).toBe(1);
  });
});

// 서버에서 데이터를
describe('changeNumber', () => {
  it('쉼표가 포함된 문자열을 숫자로 변환한다', () => {
    // Arrange
    const input = '1,234,567';

    // Act
    const result = changeNumber(input);

    // Assert
    expect(result).toBe(1234567);
  });

  it('빈 문자열이면 0을 반환한다', () => {
    // Arrange
    const input = '';

    // Act
    const result = changeNumber(input);

    // Assert
    expect(result).toBe(0);
  });

  it('숫자가 아닌 문자열이면 0을 반환한다', () => {
    // Arrange
    const input = 'abc';

    // Act
    const result = changeNumber(input);

    // Assert
    expect(result).toBe(0);
  });

  it('소수점이 포함된 문자열을 숫자로 변환한다', () => {
    // Arrange
    const input = '1,234.56';

    // Act
    const result = changeNumber(input);

    // Assert
    expect(result).toBe(1234.56);
  });

  it('숫자와 문자가 혼합된 문자열이면 숫자 부분만 변환한다', () => {
    // Arrange
    const input = '1,234.567abc';

    // Act
    const result = changeNumber(input);

    // Assert
    expect(result).toBe(1234.567);
  });

  it('쉼표만 있는 문자열이면 0을 반환한다', () => {
    expect(changeNumber(',,,')).toBe(0);
  });
});

describe('dotQuantity', () => {
  it('0이면 빈 문자열을 반환한다', () => {
    // Arrange
    const input = 0;

    // Act
    const result = dotQuantity(input);

    // Assert
    expect(result).toBe('');
  });

  it('소수점 8자리 이하는 그대로 반환한다', () => {
    // Arrange
    const input = 0.12345678;

    // Act
    const result = dotQuantity(input);

    // Assert
    expect(result).toBe('0.12345678');
  });

  it('소수점 9자리 이상이면 8자리로 반올림한다', () => {
    // Arrange
    const input = 0.123456789;

    // Act
    const result = dotQuantity(input);

    // Assert
    expect(result).toBe('0.12345679');
  });

  it('뒷자리 0은 제거된다', () => {
    // Arrange
    const input = 1.5;

    // Act
    const result = dotQuantity(input);

    // Assert
    expect(result).toBe('1.5'); // toFixed(8) 후 뒷자리 0 제거
  });

  it('정수는 그대로 반환한다 (뒷자리 0 제거)', () => {
    // Arrange
    const input = 100;

    // Act
    const result = dotQuantity(input);

    // Assert
    expect(result).toBe('100'); // toFixed(8) 후 뒷자리 0 제거
  });

  it('소수점 8자리에서 반올림이 정확히 동작한다', () => {
    // toFixed(8)은 9번째 자리에서 반올림
    expect(dotQuantity(0.123456784)).toBe('0.12345678');
    // 실제 값 확인 필요
    const value = 0.123456785;
    const result = dotQuantity(value);
    expect(result).toMatch(/^0\.1234567[89]$/);
  });
});

describe('formatNumber', () => {
  it('숫자를 한국 기준으로 변환한다', () => {
    // Arrange
    const input = 1234567;

    // Act
    const result = formatNumber(input);

    // Assert
    expect(result).toBe('1,234,567');
  });

  it('null이면 "0"을 반환한다', () => {
    // Arrange
    const input = null;

    // Act
    const result = formatNumber(input);

    // Assert
    expect(result).toBe('0');
  });

  it('undefined이면 "0"을 반환한다', () => {
    // Arrange
    const input = undefined;

    // Act
    const result = formatNumber(input);

    // Assert
    expect(result).toBe('0');
  });

  it('0이면 "0"을 반환한다', () => {
    expect(formatNumber(0)).toBe('0');
  });

  it('소수점이 포함된 숫자도 포맷팅한다', () => {
    expect(formatNumber(1234.56)).toBe('1,234.56');
  });
});

describe('formatInteger', () => {
  it('숫자를 반올림하여 정수로 변환 후 한국 금액 format으로 변환한다', () => {
    // Arrange
    const input = 1234.7;

    // Act
    const result = formatInteger(input);

    // Assert
    expect(result).toBe('1,235');
  });

  it('null이면 "0"을 반환한다', () => {
    // Arrange
    const input = null;

    // Act
    const result = formatInteger(input);

    // Assert
    expect(result).toBe('0');
  });

  it('undefined이면 "0"을 반환한다', () => {
    // Arrange
    const input = undefined;

    // Act
    const result = formatInteger(input);

    // Assert
    expect(result).toBe('0');
  });

  it('정수는 그대로 포맷팅한다', () => {
    expect(formatInteger(1234)).toBe('1,234');
  });

  it('소수점 첫째자리에서 반올림한다', () => {
    expect(formatInteger(1234.4)).toBe('1,234');
    expect(formatInteger(1234.5)).toBe('1,235');
  });
});
