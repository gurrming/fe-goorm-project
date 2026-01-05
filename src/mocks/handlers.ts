import { http, HttpResponse } from 'msw';

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
];
