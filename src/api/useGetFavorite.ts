import { useQuery } from '@tanstack/react-query';
import axiosInstance from './common/axiosInstance';

export type Interest = {
  interestId: number;
  memberId: number;
  categoryId: number;
};

export const getInterests = async (memberId: number): Promise<Interest[]> => {
  const response = await axiosInstance.get<Interest[]>('/api/interests', {
    params: {
      memberId,
    },
  });
  return response.data;
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
