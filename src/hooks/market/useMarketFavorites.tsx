import { useNavigate } from 'react-router-dom';
import { useDeleteFavorite } from '../../api/favorite/useDeleteFavorite';
import { useGetFavorite } from '../../api/favorite/useGetFavorite';
import { usePostFavorite } from '../../api/favorite/usePostFavorite';
import { useModal } from '../../components/common/Modal/hooks/useModal';
import { Modal } from '../../components/common/Modal/Modal';

export function useMarketFavorites(memberId: number | undefined) {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const { data: interestList } = useGetFavorite(memberId ?? null);
  const postFavorite = usePostFavorite();
  const deleteFavorite = useDeleteFavorite();

  const isFavoriteCategory = (categoryId: number) =>
    interestList?.some((interest) => interest.categoryId === categoryId) ?? false;

  const handleToggleFavorite = (categoryId: number) => {
    if (!memberId) {
      openModal(
        <Modal
          title="로그인 안내"
          description="관심코인을 추가하려면 로그인이 필요합니다."
          cancelButtonProps={{
            text: '취소',
            onClick: closeModal,
          }}
          confirmButtonProps={{
            text: '로그인',
            onClick: () => {
              closeModal();
              navigate('/login');
            },
          }}
        />,
      );
      return;
    }

    const isCurrentlyFavorite = interestList?.some((interest) => interest.categoryId === categoryId) ?? false;

    if (isCurrentlyFavorite) {
      const existingInterest = interestList?.find((interest) => interest.categoryId === categoryId);
      if (existingInterest) {
        deleteFavorite.mutate({
          interestId: existingInterest.interestId,
          memberId,
        });
      }
    } else {
      postFavorite.mutate({
        memberId,
        categoryId,
      });
    }
  };

  return { interestList, isFavoriteCategory, handleToggleFavorite };
}
