//  코인 가격 (price)의 가격에 따라 + / - 클릭 시 증가, 감소하는 수치를 반환하는 함수

export function getPriceTickSize(price: number): number {
  if (price >= 2_000_000) return 1000;
  if (price >= 1_000_000) return 500;
  if (price >= 100_000) return 50;
  if (price >= 10_000) return 10;
  if (price >= 1_000) return 5;
  if (price >= 100) return 1;
  return 1;
}

export const formatNumber = (point: number | string | undefined | null): string => {
  if (point == null) return '0';
  const value = typeof point === 'number' ? point : parseFloat(String(point).replace(/,/g, ''));

  if (!Number(value)) return '0';
  return value.toLocaleString('ko-KR');
};

// 소숫점 첫째자리에서 반올림하여 정수로 만들기
export const formatInteger = (point: number | undefined | null): string => {
  if (point == null) return '0';
  return Math.round(point).toLocaleString('ko-KR');
};

// 문자열을 숫자로 변환하면서 쉼표 제거해주기
// 빈 문자열이나 숫자가 아닌 문자열이 들어오면 0으로 변환, 매수 가격 지웠을 때 문제가 생김.
export const changeNumber = (strPoint: string): number => parseFloat(strPoint.replace(/,/g, '')) || 0;

// 소수점 삭제 시 0.123 → 123.     0 혼자있는 건
export const deleteZero = (coin: string): string => {
  if (!coin || coin === '0') return coin;
  const coinCount = coin.replace(/^0+/, '');
  return coinCount === '' ? '0' : coinCount;
};

// 소숫점 8째자리까지 표시하기 (소숫점 9째자리부터는 반올림되어 표시되지 않음)
// 뒷자리 0 나열 제거
export const dotQuantity = (point: number): string => {
  if (point === 0) return '';
  return point.toFixed(8).replace(/\.?0+$/, '');
};
