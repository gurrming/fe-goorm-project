// 샘플 데이터
export const mockSettledData = [
  {
    orderTime: '2025.09.22 17:54',
    type: '매도',
    executionPrice: 159713000,
    executionAmount: 249999,
    executionQuantity: 0.0015653,
  },
  {
    orderTime: '2025.09.22 17:54',
    type: '매수',
    executionPrice: 5954000,
    executionAmount: 101000,
    executionQuantity: 0.01696338,
  },
];

export const mockUnSettledData = [
  {
    orderTime: '2025.12.26 16:29',
    type: '매도',
    watchPrice: 0,
    watchAmount: 130500000000,
    watchQuantity: 0.0015653,
    unSettledPrice: 130500000000,
    unSettledAmount: 130500000000,
    unSettledQuantity: 0.0015653,
  },
];
