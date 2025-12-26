import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

/**
 * Button Component
 *
 * Button의 색상은 colorType에 따라 결정됩니다.
 *
 * @param children - Button의 내용
 * @param colorType - Button의 색상 (white, blue, indigo, gray, red)
 */
interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  colorType: 'white' | 'blue' | 'indigo' | 'gray' | 'red';
  disabled?: boolean;
}
export default function Button({ children, colorType, onClick, disabled, ...props }: IButtonProps) {
  const colorStyle = {
    white: 'bg-[#EDEEF1] text-primary-100',
    blue: 'bg-[#0062DF] text-white',
    indigo: 'bg-[#0C3887] text-white',
    gray: 'bg-[#999999] text-white',
    red: 'bg-[#DD3C44] text-white',
  };
  return (
    <button
      className={cn(
        'rounded-md px-4 py-2 w-full font-[14px]',
        colorStyle[colorType],
        'hover:cursor-pointer',
        disabled && 'opacity-50 hover:cursor-not-allowed',
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
