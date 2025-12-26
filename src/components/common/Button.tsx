import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  colorType: 'white' | 'blue' | 'indigo' | 'gray' | 'red';
}

export default function Button({ children, colorType, onClick, ...props }: IButtonProps) {
  const colorStyle = {
    white: 'bg-[#EDEEF1] text-primary-100',
    blue: 'bg-[#0062DF] text-white',
    indigo: 'bg-[#0C3887] text-white',
    gray: 'bg-[#999999] text-white',
    red: 'bg-[#DD3C44] text-white',
  };
  return (
    <button
      className={cn('rounded-md px-4 py-2 w-full font-[14px]', colorStyle[colorType], 'hover:cursor-pointer')}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
