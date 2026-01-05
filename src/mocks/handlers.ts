import { http, HttpResponse } from 'msw';
import type { Interest } from '../api/favorite/useGetFavorite';
import type { Category } from '../types/market';

// GET

export const handlers = [
  // 해당 url 요청이 오면
  http.get('https://example.com/user', () => {
    // 아래의 가짜 응답을 반환
    return HttpResponse.json({
      id: '1',
      name: '하트비트',
      age: '100',
      email: 'hihihihi@example.com',
    });
  }),

  // POST
  http.post('https://example.com/user', async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json({
      success: true,
      data: body,
    });
  }),

  // GET /api/categories - 마켓 종목 목록 조회
  http.get('/api/categories', () => {
    const categories: Category[] = [
      { categoryId: 1, categoryName: '리플', categorySymbol: 'XRP' },
      { categoryId: 2, categoryName: '비트코인', categorySymbol: 'BTC' },
      { categoryId: 3, categoryName: '이더리움', categorySymbol: 'ETH' },
      { categoryId: 4, categoryName: '테더', categorySymbol: 'USDT' },
      { categoryId: 5, categoryName: 'AVNT', categorySymbol: 'AVNT' },
      { categoryId: 6, categoryName: 'GRS', categorySymbol: 'GRS' },
      { categoryId: 7, categoryName: 'ANIME', categorySymbol: 'ANIME' },
      { categoryId: 8, categoryName: '솔라나', categorySymbol: 'SOL' },
      { categoryId: 9, categoryName: '에이다', categorySymbol: 'ADA' },
      { categoryId: 10, categoryName: '도지코인', categorySymbol: 'DOGE' },
      { categoryId: 11, categoryName: '폴카닷', categorySymbol: 'DOT' },
      { categoryId: 12, categoryName: '폴리곤', categorySymbol: 'MATIC' },
      { categoryId: 13, categoryName: '체인링크', categorySymbol: 'LINK' },
      { categoryId: 14, categoryName: '유니스왑', categorySymbol: 'UNI' },
      { categoryId: 15, categoryName: '라이트코인', categorySymbol: 'LTC' },
      { categoryId: 16, categoryName: '비트코인캐시', categorySymbol: 'BCH' },
      { categoryId: 17, categoryName: '스텔라루멘', categorySymbol: 'XLM' },
      { categoryId: 18, categoryName: '코스모스', categorySymbol: 'ATOM' },
      { categoryId: 19, categoryName: '이더리움클래식', categorySymbol: 'ETC' },
      { categoryId: 20, categoryName: '알고랜드', categorySymbol: 'ALGO' },
      { categoryId: 21, categoryName: '파일코인', categorySymbol: 'FIL' },
      { categoryId: 22, categoryName: '트론', categorySymbol: 'TRX' },
      { categoryId: 23, categoryName: '이오스', categorySymbol: 'EOS' },
      { categoryId: 24, categoryName: '에이브', categorySymbol: 'AAVE' },
      { categoryId: 25, categoryName: '메이커', categorySymbol: 'MKR' },
      { categoryId: 26, categoryName: '컴파운드', categorySymbol: 'COMP' },
      { categoryId: 27, categoryName: '신세틱스', categorySymbol: 'SNX' },
      { categoryId: 28, categoryName: '이어니파이', categorySymbol: 'YFI' },
      { categoryId: 29, categoryName: '스시스왑', categorySymbol: 'SUSHI' },
      { categoryId: 30, categoryName: '커브', categorySymbol: 'CRV' },
    ];

    return HttpResponse.json(categories);
  }),

  // GET /api/interests - 관심 종목 목록 조회
  http.get('/api/interests', ({ request }) => {
    const url = new URL(request.url);
    const memberId = url.searchParams.get('memberId');

    // memberId에 따라 관심 종목 반환 (배열 직접 반환)
    const interests: Interest[] = [
      { interestId: 1, memberId: Number(memberId), categoryId: 1 },
      { interestId: 2, memberId: Number(memberId), categoryId: 3 },
      { interestId: 3, memberId: Number(memberId), categoryId: 8 },
    ];

    return HttpResponse.json(interests);
  }),
];
