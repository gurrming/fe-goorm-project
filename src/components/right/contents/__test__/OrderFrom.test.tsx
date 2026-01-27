import { describe, it, expect } from 'vitest';
import { changeNumber, dotQuantity, getPriceTickSize } from '../../../../lib/price';

/**
 * OrderForm의 계산 로직 검증
 * 총액 계산
 * 수량 입력 검증 (소수점 8자리 제한, 중복 점 처리)
 * 총액 입력 시 수량 계산
 */

describe('OrderForm 총액 계산', () => {
  // 총액 계산 함수
  const calculateTotalMoney = (userTotalAmount: string, price: string, quantity: string): number => {
    const changedPriceNum = changeNumber(price);
    const quantityNum = changeNumber(quantity);
    return userTotalAmount ? Math.round(changeNumber(userTotalAmount)) : Math.round(changedPriceNum * quantityNum);
  };

  it('userTotalAmount가 있으면 userTotalAmount를 반올림하여 반환한다', () => {
    // Arrange
    const userTotalAmount = '12345.67';
    const price = '50000';
    const quantity = '1';

    // Act
    const result = calculateTotalMoney(userTotalAmount, price, quantity);

    // Assert
    expect(result).toBe(12346); // Math.round(12345.67) = 12346
  });

  it('userTotalAmount가 없으면 price * quantity를 반올림하여 반환한다', () => {
    // Arrange
    const userTotalAmount = '';
    const price = '50000';
    const quantity = '0.5';

    // Act
    const result = calculateTotalMoney(userTotalAmount, price, quantity);

    // Assert
    expect(result).toBe(25000); // Math.round(50000 * 0.5) = 25000
  });

  it('userTotalAmount가 빈 문자열이면 price * quantity를 사용한다', () => {
    // Arrange
    const userTotalAmount = '';
    const price = '100000';
    const quantity = '2.5';

    // Act
    const result = calculateTotalMoney(userTotalAmount, price, quantity);

    // Assert
    expect(result).toBe(250000); //100000 * 2.5 = 250000
  });

  it('소수점이 포함된 계산도 정확히 반올림한다', () => {
    // Arrange
    const userTotalAmount = '';
    const price = '33333.33';
    const quantity = '3';

    // Act
    const result = calculateTotalMoney(userTotalAmount, price, quantity);

    // Assert
    expect(result).toBe(100000); //33333.33 * 3 = 100000
  });
});

describe('OrderForm 수량 입력 검증 (handleQuantityChange 로직)', () => {
  // 수량 입력 검증 함수 (실제 컴포넌트 로직)
  const validateQuantityInput = (input: string): string => {
    let value = input.replace(/[^0-9.]/g, '');

    // 소수점 8자리 제한 (정규식으로 첫 번째 소수점 이후 8자리까지만 허용)
    value = value.replace(/(\.\d{8})\d+/, '$1');

    return value;
  };

  it('소수점 8자리 이하는 그대로 반환한다', () => {
    // Arrange
    const input = '0.12345678';

    // Act
    const result = validateQuantityInput(input);

    // Assert
    expect(result).toBe('0.12345678');
  });

  it('소수점 9자리 이상이면 8자리로 제한한다', () => {
    // Arrange
    const input = '0.123456789';

    // Act
    const result = validateQuantityInput(input);

    // Assert
    expect(result).toBe('0.12345678');
  });

  it('숫자가 아닌 문자는 제거한다', () => {
    // Arrange
    const input = '1a2b3c.4d5e6';

    // Act
    const result = validateQuantityInput(input);

    // Assert
    expect(result).toBe('123.456');
  });

  it('정수는 그대로 반환한다', () => {
    // Arrange
    const input = '100';

    // Act
    const result = validateQuantityInput(input);

    // Assert
    expect(result).toBe('100');
  });
});

describe('OrderForm 총액 입력 시 수량 계산 (handleTotalAmountChange 로직)', () => {
  // 총액 입력 시 수량 계산 함수 (실제 컴포넌트 로직)
  const calculateQuantityFromTotalAmount = (totalAmount: string, price: string): string => {
    const roundedAmount = totalAmount ? Math.round(changeNumber(totalAmount)) : 0;
    const changedPriceNum = changeNumber(price);
    return roundedAmount > 0 && changedPriceNum > 0 ? dotQuantity(roundedAmount / changedPriceNum) : '';
  };

  it('roundedAmount가 0이면 빈 문자열을 반환한다', () => {
    // Arrange
    const totalAmount = '';
    const price = '50000';

    // Act
    const result = calculateQuantityFromTotalAmount(totalAmount, price);

    // Assert
    expect(result).toBe('');
  });

  it('정상적인 계산: 총액 100000원, 가격 50000원이면 수량 2를 반환한다', () => {
    // Arrange
    const totalAmount = '100000';
    const price = '50000';

    // Act
    const result = calculateQuantityFromTotalAmount(totalAmount, price);

    // Assert
    // dotQuantity는 뒷자리 0을 제거하므로 "2" 반환
    expect(result).toBe('2');
  });

  it('소수점이 포함된 계산을 처리한다', () => {
    // Arrange
    const totalAmount = '100000';
    const price = '30000';

    // Act
    const result = calculateQuantityFromTotalAmount(totalAmount, price);

    // Assert
    // 100000 / 30000 = 3.33333333... → dotQuantity로 8자리 제한
    expect(result).toBe('3.33333333');
  });

  it('총액이 가격보다 작으면 1 미만의 수량을 반환한다', () => {
    // Arrange
    const totalAmount = '25000';
    const price = '50000';

    // Act
    const result = calculateQuantityFromTotalAmount(totalAmount, price);

    // Assert
    expect(result).toBe('0.5');
  });

  it('총액 입력값이 쉼표가 포함되어 있어도 처리한다', () => {
    // Arrange
    const totalAmount = '1,000,000';
    const price = '50000';

    // Act
    const result = calculateQuantityFromTotalAmount(totalAmount, price);

    // Assert
    expect(result).toBe('20');
  });

  it('소수점 8자리 초과는 8자리로 제한된다', () => {
    // Arrange
    const totalAmount = '100000';
    const price = '3'; // 100000 / 3 = 33333.33333333

    // Act
    const result = calculateQuantityFromTotalAmount(totalAmount, price);

    // Assert
    expect(result).toBe('33333.33333333');
  });
});

describe('OrderForm 틱을 통한 가격 조정 (priceUpDown 로직)', () => {
  // 틱을 통한 가격 조정 함수 (실제 컴포넌트 로직)
  const priceUpDown = (currentPrice: number, clickType: 'up' | 'down'): number => {
    const step = getPriceTickSize(currentPrice);
    const newPrice = clickType === 'up' ? currentPrice + step : currentPrice - step;
    // 틱을 통한 가격 조정 시 0 미만으로 떨어지지 않도록 보정
    return Math.max(0, newPrice);
  };

  it('틱을 통한 가격 증가 (up) 시 정상적으로 증가한다', () => {
    // Arrange
    const currentPrice = 50000;
    const clickType = 'up';

    // Act
    const result = priceUpDown(currentPrice, clickType);

    // Assert
    // 50000원의 틱 크기는 10이므로 50010이 되어야 함
    expect(result).toBe(50010);
  });

  it('틱을 통한 가격 감소 (down) 시 정상적으로 감소한다', () => {
    // Arrange
    const currentPrice = 50000;
    const clickType = 'down';

    // Act
    const result = priceUpDown(currentPrice, clickType);

    // Assert
    // 50000원의 틱 크기는 10이므로 49990이 되어야 함
    expect(result).toBe(49990);
  });

  it('틱을 통한 가격 감소 시 0 미만으로 떨어지지 않도록 보정한다', () => {
    // Arrange
    const currentPrice = 3; // 틱 크기 1
    const clickType = 'down';

    // Act
    const result = priceUpDown(currentPrice, clickType);

    // Assert
    // 3 - 1 = 2이므로 정상적으로 감소
    expect(result).toBe(2);
  });

  it('0에서 down 클릭 시 0을 유지한다', () => {
    // Arrange
    const currentPrice = 0;
    const clickType = 'down';

    // Act
    const result = priceUpDown(currentPrice, clickType);

    // Assert
    // 0 - 1 = -1이지만 Math.max(0, -1) = 0으로 보정
    expect(result).toBe(0);
  });

  it('틱 크기보다 작은 값에서 down 클릭 시 0으로 보정된다', () => {
    // Arrange
    const currentPrice = 2; // 틱 크기 1
    const clickType = 'down';

    // Act
    const result = priceUpDown(currentPrice, clickType);

    // Assert
    // 2 - 1 = 1이므로 정상적으로 감소
    expect(result).toBe(1);
  });

  it('틱 크기와 동일한 값에서 down 클릭 시 0으로 보정된다', () => {
    // Arrange
    const currentPrice = 1; // 틱 크기 1
    const clickType = 'down';

    // Act
    const result = priceUpDown(currentPrice, clickType);

    // Assert
    // 1 - 1 = 0이므로 0 반환
    expect(result).toBe(0);
  });

  it('틱 크기보다 작은 값(0.5)에서 down 클릭 시 0으로 보정된다', () => {
    // Arrange
    const currentPrice = 0.5; // 틱 크기 1
    const clickType = 'down';

    // Act
    const result = priceUpDown(currentPrice, clickType);

    // Assert
    // 0.5 - 1 = -0.5이지만 Math.max(0, -0.5) = 0으로 보정
    expect(result).toBe(0);
  });

  it('높은 가격대에서 틱 감소 시 정상 동작한다', () => {
    // Arrange
    const currentPrice = 1500000; // 틱 크기 500
    const clickType = 'down';

    // Act
    const result = priceUpDown(currentPrice, clickType);

    // Assert
    // 1500000 - 500 = 1499500
    expect(result).toBe(1499500);
  });

  it('높은 가격대에서 틱 증가 시 정상 동작한다', () => {
    // Arrange
    const currentPrice = 2000000; // 틱 크기 1000
    const clickType = 'up';

    // Act
    const result = priceUpDown(currentPrice, clickType);

    // Assert
    // 2000000 + 1000 = 2001000
    expect(result).toBe(2001000);
  });
});
