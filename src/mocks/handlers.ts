import { http, HttpResponse } from 'msw';
import type { Interest } from '../api/favorite/useGetFavorite';
import type { Category } from '../types/market';

// Mock 데이터
const mockCategories: Category[] = [
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
];

// 관심 종목 데이터 (메모리 기반, 실제로는 서버에서 관리)
const mockInterests: Interest[] = [
  { interestId: 1, memberId: 1, categoryId: 2 }, // 비트코인
  { interestId: 2, memberId: 1, categoryId: 3 }, // 이더리움
  { interestId: 3, memberId: 1, categoryId: 8 }, // 솔라나
];

export const handlers = [
  // GET /api/categories - 카테고리 목록 조회
  http.get('/api/categories', () => {
    return HttpResponse.json(mockCategories);
  }),

  // GET /api/interests - 관심 종목 목록 조회
  http.get('/api/interests', ({ request }) => {
    const url = new URL(request.url);
    const memberId = url.searchParams.get('memberId');

    if (!memberId) {
      return HttpResponse.json({ error: 'memberId is required' }, { status: 400 });
    }

    const memberInterests = mockInterests.filter((interest) => interest.memberId === Number(memberId));
    return HttpResponse.json(memberInterests);
  }),

  // POST /api/interests - 관심 종목 추가
  http.post('/api/interests', async ({ request }) => {
    const body = (await request.json()) as { memberId: number; categoryId: number };

    // 이미 존재하는지 확인
    const existing = mockInterests.find(
      (interest) => interest.memberId === body.memberId && interest.categoryId === body.categoryId,
    );

    if (existing) {
      return HttpResponse.json({ error: 'Already exists' }, { status: 400 });
    }

    // 새 관심 종목 추가
    const newInterest: Interest = {
      interestId: mockInterests.length > 0 ? Math.max(...mockInterests.map((i) => i.interestId)) + 1 : 1,
      memberId: body.memberId,
      categoryId: body.categoryId,
    };

    mockInterests.push(newInterest);
    return HttpResponse.json(newInterest, { status: 201 });
  }),

  // DELETE /api/interests/:interestId - 관심 종목 삭제
  http.delete('/api/interests/:interestId', ({ request, params }) => {
    const url = new URL(request.url);
    const memberId = url.searchParams.get('memberId');
    const interestId = Number(params.interestId);

    if (!memberId) {
      return HttpResponse.json({ error: 'memberId is required' }, { status: 400 });
    }

    const index = mockInterests.findIndex(
      (interest) => interest.interestId === interestId && interest.memberId === Number(memberId),
    );

    if (index === -1) {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    }

    mockInterests.splice(index, 1);
    return HttpResponse.json(null, { status: 204 });
  }),
];
