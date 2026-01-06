import { createContext, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalContextType {
  openModal: (modal: React.ReactNode) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentModal, setCurrentModal] = useState<React.ReactNode | null>(null);

  const openModal = useCallback((modal: React.ReactNode) => {
    setCurrentModal(modal);
  }, []);

  const closeModal = useCallback(() => {
    setCurrentModal(null);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {createPortal(
        currentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45">{currentModal}</div>
        ),
        document.body,
      )}
    </ModalContext.Provider>
  );
};
