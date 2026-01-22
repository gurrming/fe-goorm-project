import { useQuery } from '@tanstack/react-query';
import { request } from '../common/axiosInstance';

export type Interest = {
  interestId: number;
  memberId: number;
  categoryId: number;
};

export const getInterests = (memberId: number): Promise<Interest[]> => {
  return request<Interest[]>({
    method: 'GET',
    url: '/api/interests',
    params: {
      memberId,
    },
  });
};

export const useGetFavorite = (memberId: number | null) => {
  return useQuery({
    queryKey: ['interests', memberId],
    queryFn: () => {
      if (!memberId) {
        throw new Error('멤버 아이디가 없습니다.');
      }
      return getInterests(memberId);
    },
    enabled: !!memberId,
  });
};
