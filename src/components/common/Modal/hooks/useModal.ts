import { useContext } from 'react';
import { ModalContext } from '../ModalProvider';

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal는 ModalProvider 내부에서 사용해야 합니다.');
  }

  return {
    openModal: (modal: React.ReactNode) => context.openModal(modal),
    closeModal: () => context.closeModal(),
  };
};
