import Button from '../Button';
import { useModal } from './hooks/useModal';

export type ModalButton = {
  label: string;
  onClick: () => void;
  colorType?: 'white' | 'blue' | 'indigo' | 'gray' | 'red';
  className?: string;
  isLoading?: boolean;
};

interface ModalProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  cancelButtonProps?: {
    text: string;
    onClick?: () => void;
    isLoading?: boolean;
  };
  confirmButtonProps?: {
    text: string;
    onClick: () => void;
    isLoading?: boolean;
  };
  customButtonProps?: React.ReactNode;
  closeOnBackdropClick?: boolean;
  width?: string;
}

export function Modal({
  title,
  description,
  cancelButtonProps,
  confirmButtonProps,
  customButtonProps,
  closeOnBackdropClick = true,
  width = '400px',
}: ModalProps) {
  const { closeModal } = useModal();

  const handleBackdropClick = () => {
    if (closeOnBackdropClick) {
      closeModal();
    }
  };

  const handleCancel = () => {
    if (cancelButtonProps?.onClick) {
      cancelButtonProps.onClick();
    }
    closeModal();
  };

  const handleConfirm = () => {
    if (confirmButtonProps?.onClick) {
      confirmButtonProps.onClick();
    }
  };

  // 버튼 레이아웃 결정
  const hasButtons = cancelButtonProps || confirmButtonProps || customButtonProps;
  const buttonContainerClass =
    cancelButtonProps && confirmButtonProps
      ? 'flex gap-3'
      : confirmButtonProps && !cancelButtonProps
        ? 'flex justify-end'
        : 'flex gap-3';

  return (
    <>
      {closeOnBackdropClick && <div className="absolute inset-0" onClick={handleBackdropClick} />}
      <div
        className="relative bg-white p-6 pointer-events-auto border-none rounded-xs"
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xl font-bold text-primary-100 mb-3">{title}</div>
        {description && <div className="text-sm text-gray-600 mb-6">{description}</div>}
        {hasButtons && (
          <div className={buttonContainerClass}>
            {cancelButtonProps && confirmButtonProps && (
              <>
                <Button
                  colorType="white"
                  onClick={handleCancel}
                  disabled={cancelButtonProps.isLoading}
                  className="border border-primary-900 text-primary-900 bg-white hover:bg-gray-50 flex-1"
                >
                  {cancelButtonProps.isLoading ? '로딩 중...' : cancelButtonProps.text}
                </Button>
                <Button
                  colorType="blue"
                  onClick={handleConfirm}
                  disabled={confirmButtonProps.isLoading}
                  className="flex-1"
                >
                  {confirmButtonProps.isLoading ? '로딩 중...' : confirmButtonProps.text}
                </Button>
              </>
            )}
            {!cancelButtonProps && confirmButtonProps && (
              <Button colorType="blue" onClick={handleConfirm} disabled={confirmButtonProps.isLoading}>
                {confirmButtonProps.isLoading ? '로딩 중...' : confirmButtonProps.text}
              </Button>
            )}
            {customButtonProps && customButtonProps}
          </div>
        )}
      </div>
    </>
  );
}
