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
